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

import { Color } from "serene-front/data";
import { AirQualityIndex } from "./air-quality-index";
import { HealthRecommendations } from "./health-recommendations";
import { Pollutant } from "./pollutant";

/**
 * Hourly air quality information.
 */
export interface CurrentAirConditions {
    /**
     * A rounded down timestamp in RFC3339 UTC "Zulu" format, with nanosecond resolution and up to nine fractional digits.
     */
    readonly dateTime: Date;

    /**
     * The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request.
     * This field might be omitted from the response if the location provided in the request resides in a disputed territory.
     */
    readonly regionCode?: string;
    
    /**
     * Based on the request parameters, this list will include (up to) two air quality indexes:
     * 
     * - Universal AQI. Will be returned if the universalAqi boolean is set to true.
     * - Local AQI. Will be returned if the LOCAL_AQI extra computation is specified.
     */
    readonly indexes: AirQualityIndex[];

    /**
     * A list of pollutants affecting the location specified in the request.
     * 
     * Note: This field will be returned only for requests that specified one or more of the following extra computations:
     * `POLLUTANT_ADDITIONAL_INFO`, `DOMINANT_POLLUTANT_CONCENTRATION`, `POLLUTANT_CONCENTRATION`.
     */
    readonly pollutants?: Pollutant[];

    /**
     * Health advice and recommended actions related to the reported air quality conditions.
     * 
     * Recommendations are tailored differently for populations at risk, 
     * groups with greater sensitivities to pollutants, and the general population.
     */
    readonly healthRecommendations?: HealthRecommendations;
}

/**
 * Create a `CurrentAirConditions` object from a given JSON representation.
 * 
 * @param raw A string containing a JSON representation of a `CurrentAirConditions` object.
 * @returns A parsed `CurrentAirConditions` object ready for use.
 */
export function parseCurrentAirConditions(json: string): CurrentAirConditions {
    const object = JSON.parse(json, (key, value) => {
        if (typeof value === "string" && key === "dateTime") {
            return new Date(value);
        } else if (key === "color") {
            return Color.revive(value);
        } else {
            return value;
        }
    });
    return object as CurrentAirConditions;
}
