/**
 * ROI / value model for the Billby value calculator.
 *
 * Billby drives value for a law firm in three ways. Each is expressed as a
 * tunable assumption so the figures stay honest and a sceptical buyer can dial
 * them to their own reality:
 *
 *  1. Reclaimed admin time — minutes/day a lawyer no longer spends writing
 *     timesheets, redirected to billable work and valued at the billable rate.
 *  2. Recovered billable hours — work that today slips through the cracks
 *     (reconstructed from memory, entered days late, never timed) and never
 *     gets billed. Billby captures it. Expressed as a % uplift on hours billed.
 *  3. Reduced write-offs — accurate, detailed, guideline-compliant narratives
 *     mean fewer disputed or written-down entries. A cut to the firm's
 *     existing write-off rate.
 *
 * All money is in AUD/year. Nothing here is a guarantee — these are estimates,
 * and the UI says so.
 */

export interface RoiInputs {
  /** Number of fee earners (lawyers) at the firm. */
  feeEarners: number
  /** Average billable rate, AUD per hour. */
  billableRate: number
  /** Billable hours each fee earner currently logs per working day. */
  billableHoursPerDay: number

  // --- Assumptions (sensible defaults, adjustable in the UI) ---
  /** Billable working days per year (accounts for leave/holidays). */
  workingDaysPerYear: number
  /** Minutes per day each lawyer spends writing/reconstructing timesheets today. */
  adminMinutesPerDay: number
  /**
   * Share of reclaimed admin time that converts to billable work (0-1).
   * Not all recovered minutes become billable — this discounts for that.
   */
  adminToBillableRate: number
  /**
   * Uplift in captured billable hours from never missing recordable work (0-1).
   * e.g. 0.08 = 8% more of the work already being done actually gets billed.
   */
  captureUpliftRate: number
  /** Firm's current write-off rate — share of billed value never collected (0-1). */
  currentWriteOffRate: number
  /** Share of that write-off Billby's accuracy eliminates (0-1). */
  writeOffReductionRate: number
}

export interface RoiBreakdown {
  /** Value of admin time reclaimed and redirected to billable work. */
  reclaimedAdminValue: number
  /** Revenue from billable hours that would otherwise go uncaptured. */
  recoveredBillableValue: number
  /** Revenue saved by reducing write-offs. */
  reducedWriteOffValue: number
  /** Sum of the three drivers — total additional revenue per year. */
  totalAnnualValue: number
  /** totalAnnualValue / feeEarners. */
  perFeeEarnerValue: number
  /** Admin hours given back to the firm per year (across all fee earners). */
  hoursReclaimedPerYear: number
  /** The firm's current annual billings, for context. */
  annualBillings: number
  /** Estimated annual Billby subscription cost across all fee earners. */
  annualCost: number
  /** totalAnnualValue minus annualCost — the firm's net gain. */
  netAnnualValue: number
}

/** Indicative Billby list price, AUD per fee earner per month. */
export const MONTHLY_PRICE_PER_FEE_EARNER = 100

export const DEFAULT_ROI_INPUTS: RoiInputs = {
  feeEarners: 20,
  billableRate: 450,
  billableHoursPerDay: 6,
  workingDaysPerYear: 230,
  adminMinutesPerDay: 20,
  adminToBillableRate: 0.6,
  captureUpliftRate: 0.08,
  currentWriteOffRate: 0.08,
  writeOffReductionRate: 0.25,
}

/** Clamp helper so out-of-range inputs can't produce nonsense. */
function clamp(n: number, min: number, max: number): number {
  if (Number.isNaN(n)) return min
  return Math.min(Math.max(n, min), max)
}

export function calculateRoi(inputs: RoiInputs): RoiBreakdown {
  const feeEarners = clamp(inputs.feeEarners, 0, 100000)
  const billableRate = clamp(inputs.billableRate, 0, 100000)
  const billableHoursPerDay = clamp(inputs.billableHoursPerDay, 0, 24)
  const workingDaysPerYear = clamp(inputs.workingDaysPerYear, 0, 366)
  const adminMinutesPerDay = clamp(inputs.adminMinutesPerDay, 0, 24 * 60)
  const adminToBillableRate = clamp(inputs.adminToBillableRate, 0, 1)
  const captureUpliftRate = clamp(inputs.captureUpliftRate, 0, 1)
  const currentWriteOffRate = clamp(inputs.currentWriteOffRate, 0, 1)
  const writeOffReductionRate = clamp(inputs.writeOffReductionRate, 0, 1)

  const annualBillings =
    billableHoursPerDay * billableRate * workingDaysPerYear * feeEarners

  // 1. Reclaimed admin time → billable work.
  const reclaimedAdminHoursPerYear =
    (adminMinutesPerDay / 60) * workingDaysPerYear * feeEarners
  const reclaimedAdminValue =
    reclaimedAdminHoursPerYear * adminToBillableRate * billableRate

  // 2. Recovered billable hours that today go uncaptured.
  const recoveredBillableValue = annualBillings * captureUpliftRate

  // 3. Reduced write-offs from accurate, detailed narratives.
  const reducedWriteOffValue =
    annualBillings * currentWriteOffRate * writeOffReductionRate

  const totalAnnualValue =
    reclaimedAdminValue + recoveredBillableValue + reducedWriteOffValue

  const annualCost = feeEarners * MONTHLY_PRICE_PER_FEE_EARNER * 12

  return {
    reclaimedAdminValue,
    recoveredBillableValue,
    reducedWriteOffValue,
    totalAnnualValue,
    perFeeEarnerValue: feeEarners > 0 ? totalAnnualValue / feeEarners : 0,
    hoursReclaimedPerYear: reclaimedAdminHoursPerYear,
    annualBillings,
    annualCost,
    netAnnualValue: totalAnnualValue - annualCost,
  }
}

/** Format a whole-dollar AUD figure with thousands separators, no cents. */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    maximumFractionDigits: 0,
  }).format(Math.round(value))
}

/** Compact currency for tight spaces, e.g. $1.9M, $84k. */
export function formatCompactCurrency(value: number): string {
  const abs = Math.abs(value)
  if (abs >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
  if (abs >= 1_000) return `$${Math.round(value / 1_000)}k`
  return `$${Math.round(value)}`
}
