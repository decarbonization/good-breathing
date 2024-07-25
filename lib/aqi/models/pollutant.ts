/*
 * MIT No Attribution
 * 
 * Copyright 2024 Peter "Kevin" Contreras
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software
 * without restriction, including without limitation the rights to use, copy, modify,
 * merge, publish, distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A
 * PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 * SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

export interface Pollutant {
    /**
     * The pollutant's code name. For example: "so2".
     */
    readonly code: string;

    /**
     * The pollutant's display name. For example: "NOx".
     */
    readonly displayName: string;

    /**
     * The pollutant's full name. For chemical compounds, this is the IUPAC name. Example: "Sulfur Dioxide".
     * 
     * For more information about the IUPAC names table, see <https://iupac.org/what-we-do/periodic-table-of-elements/>.
     */
    readonly fullName: string;

    /**
     * The pollutant's concentration level measured by one of the standard air pollutation measure units.
     */
    readonly concentration: PollutantConcentration;

    /**
     * Additional information about the pollutant.
     */
    readonly additionalInfo: PollutantAdditionalInfo;
}

/**
 * The concentration of a given pollutant in the air.
 */
export interface PollutantConcentration {
    /**
     * Units for measuring this pollutant concentration.
     */
    readonly units: PollutantUnit;

    /**
     * Value of pollutant concentration.
     */
    readonly value: number;
}

/**
 * Defines the unit used to measure the pollutant's concentration.
 */
export const enum PollutantUnit {
    /**
     * Unspecified concentration unit.
     */
    unspecified = "UNIT_UNSPECIFIED",
    
    /**
     * The ppb (parts per billion) concentration unit.
     */
    partsPerBillion = "PARTS_PER_BILLION",
    
    /**
     * The "µg/m^3" (micrograms per cubic meter) concentration unit.
     */
    microgramsPerCubicMeter = "MICROGRAMS_PER_CUBIC_METER",
}

/**
 * The emission sources and health effects of a given pollutant.
 */
export interface PollutantAdditionalInfo {
    /**
     * Text representing the pollutant's main emission sources.
     */
    readonly sources: string;

    /**
     * Text representing the pollutant's main health effects.
     */
    readonly effects: string;
}
