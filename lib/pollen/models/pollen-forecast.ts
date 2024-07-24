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

import { PollenDayInfo } from "./pollen-day-info";

/**
 * Up to 5 days of daily pollen information in more than 65 countries, up to 1km resolution.
 */
export interface PollenForecast {
    /**
     * The ISO_3166-1 alpha-2 code of the country/region corresponding to the location provided in the request.
     * This field might be omitted from the response if the location provided in the request resides in a disputed territory.
     */
    readonly regionCode?: string;

    /**
     * This object contains the daily forecast information for each day requested.
     */
    readonly dailyInfo: PollenDayInfo[];

    /**
     * The token to retrieve the next page.
     */
    readonly nextPageToken?: string;
}

/**
 * Create a `PollenForecast` object from a given JSON representation.
 * 
 * @param raw A string containing a JSON representation of a `PollenForecast` object.
 * @returns A parsed `PollenForecast` object ready for use.
 */
export function parsePollenForecast(json: string): PollenForecast {
    const object = JSON.parse(json, (key, value) => {
        if (typeof value === "string" && (key === "picture" || key === "pictureCloseup")) {
            return new URL(value);
        } else if (typeof value === "object" && value !== null && key === "date") {
            const year = value["year"] as number | undefined ?? 1970;
            const month = value["month"] as number | undefined ?? 1;
            const day = value["day"] as number | undefined ?? 1;
            return new Date(Date.UTC(year, month - 1, day));
        } else {
            return value;
        }
    });
    return object as PollenForecast;
}
