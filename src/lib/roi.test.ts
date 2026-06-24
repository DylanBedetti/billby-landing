import { describe, it, expect } from 'vitest'
import {
  calculateRoi,
  DEFAULT_ROI_INPUTS,
  formatCurrency,
  formatCompactCurrency,
  type RoiInputs,
} from './roi'

describe('calculateRoi', () => {
  it('computes the three drivers and their total with defaults', () => {
    const r = calculateRoi(DEFAULT_ROI_INPUTS)

    // annual billings: 6 * 450 * 230 * 20 = 12,420,000
    expect(r.annualBillings).toBe(12_420_000)

    // reclaimed admin: (20/60)*230*20 = 1533.33 hrs; * 0.6 * 450
    expect(r.hoursReclaimedPerYear).toBeCloseTo(1533.33, 1)
    expect(r.reclaimedAdminValue).toBeCloseTo(414_000, 0)

    // recovered billable: 12,420,000 * 0.08
    expect(r.recoveredBillableValue).toBeCloseTo(993_600, 0)

    // reduced write-offs: 12,420,000 * 0.08 * 0.25
    expect(r.reducedWriteOffValue).toBeCloseTo(248_400, 0)

    expect(r.totalAnnualValue).toBeCloseTo(
      r.reclaimedAdminValue + r.recoveredBillableValue + r.reducedWriteOffValue,
      0,
    )
    expect(r.perFeeEarnerValue).toBeCloseTo(r.totalAnnualValue / 20, 0)

    // cost: 20 fee earners * $150 * 12 months
    expect(r.annualCost).toBe(36_000)
    expect(r.netAnnualValue).toBeCloseTo(r.totalAnnualValue - 36_000, 0)
  })

  it('scales linearly with fee earners', () => {
    const one = calculateRoi({ ...DEFAULT_ROI_INPUTS, feeEarners: 1 })
    const ten = calculateRoi({ ...DEFAULT_ROI_INPUTS, feeEarners: 10 })
    expect(ten.totalAnnualValue).toBeCloseTo(one.totalAnnualValue * 10, 0)
  })

  it('returns all zeros when there are no fee earners', () => {
    const r = calculateRoi({ ...DEFAULT_ROI_INPUTS, feeEarners: 0 })
    expect(r.totalAnnualValue).toBe(0)
    expect(r.perFeeEarnerValue).toBe(0)
    expect(r.annualBillings).toBe(0)
  })

  it('clamps out-of-range and NaN inputs instead of producing nonsense', () => {
    const bad: RoiInputs = {
      ...DEFAULT_ROI_INPUTS,
      feeEarners: Number.NaN,
      captureUpliftRate: 5, // > 1
      billableHoursPerDay: -3,
    }
    const r = calculateRoi(bad)
    expect(Number.isFinite(r.totalAnnualValue)).toBe(true)
    expect(r.totalAnnualValue).toBeGreaterThanOrEqual(0)
  })

  it('zeroing every driver assumption yields zero value', () => {
    const r = calculateRoi({
      ...DEFAULT_ROI_INPUTS,
      adminMinutesPerDay: 0,
      captureUpliftRate: 0,
      currentWriteOffRate: 0,
    })
    expect(r.totalAnnualValue).toBe(0)
  })
})

describe('formatCurrency', () => {
  it('formats whole dollars with no cents', () => {
    expect(formatCurrency(1234567)).toBe('$1,234,567')
  })
})

describe('formatCompactCurrency', () => {
  it('formats millions and thousands compactly', () => {
    expect(formatCompactCurrency(1_900_000)).toBe('$1.9M')
    expect(formatCompactCurrency(84_000)).toBe('$84k')
    expect(formatCompactCurrency(500)).toBe('$500')
  })
})
