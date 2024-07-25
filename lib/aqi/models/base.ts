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

/**
 * Additional features that can be optionally enabled. Specifying extra computations 
 * will result in the relevant elements and fields to be returned in the response.
 */
export const enum ExtraComputation {
    /**
     * The default value. The server ignores it if it is passed as a parameter.
     */
    unspecified = "EXTRA_COMPUTATION_UNSPECIFIED",

    /**
     * Determines whether to include the local (national) AQI of the requested location (country) in the response.
     * 
     * If specified, the response will contain an 'air_quality_index' data structure with all the relevant data on the location's local AQI.
     */
    localAqi = "LOCAL_AQI",

    /**
     * Determines whether the response will include the health advice and recommended actions for the current AQI conditions.
     * 
     * The recommendations are tailored for the general population and six populations at risk groups with greater sensitivities to pollutants than the general population.
     * 
     * If specified, the `healthRecommendations` field will be populated in the response when the relevant data is available.
     */
    healthRecommendations = "HEALTH_RECOMMENDATIONS",

    /**
     * Determines whether to include in the response the additional information of each pollutant.
     * 
     * If specified, each air quality index object contained in the 'indexes' field response will include an `additionalInfo` field when the data is available.
     */
    pollutantAdditionalInfo = "POLLUTANT_ADDITIONAL_INFO",

    /**
     * Determines whether the response would include the concentrations of the dominant pollutants measured according to global and/or local indexes.
     * 
     * If the request specified both the global AQI and the local AQI, there may be up to two pollutant codes returned.
     * 
     * If specified, the dominant pollutant object contained in the 'pollutants' list will include a `concentration` field when the data is available.
     */
    dominantPollutantConcentration = "DOMINANT_POLLUTANT_CONCENTRATION",

    /**
     * Determines whether the response would include the concentrations of all pollutants with available measurements according to global and/or local indexes.
     * 
     * If specified, each pollutant object contained in the 'pollutants' field in the response will include a `concentration` field when the data is available.
     */
    pollutantConcentration = "POLLUTANT_CONCENTRATION",
}

/**
 * Determines the color palette used for the data provided by the "Universal Air Quality Index" (UAQI). 
 * This color palette is relevant just for UAQI, other AQIs have a predetermined color palette that can't be controlled.
 */
export const enum ColorPalette {
    /**
     * The default value. Ignored if passed as a parameter.
     */
    unspecified = "COLOR_PALETTE_UNSPECIFIED",

    /**
     * Determines whether to use a red/green palette.
     */
    redGreen = "RED_GREEN",

    /**
     * Determines whether to use a indigo/persian palette (dark theme).
     */
    indigoPersianDark = "INDIGO_PERSIAN_DARK",

    /**
     * Determines whether to use a indigo/persian palette (light theme).
     */
    indigoPersianLight = "INDIGO_PERSIAN_LIGHT",
}

/**
 * Expresses a 'country/region to AQI' relationship. Pairs a country/region with a desired AQI so that air 
 * quality data that is required for that country/region will be displayed according to the chosen AQI.
 */
export interface CustomLocalAqi {
    /**
     * The country/region requiring the custom AQI. Value should be provided using ISO 3166-1 alpha-2 code.
     */
    readonly regionCode: string;

    /**
     * The AQI to associate the country/region with. Value should be a valid index code.
     */
    readonly aqi: string;
};
