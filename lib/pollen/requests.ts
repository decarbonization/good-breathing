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

import { SereneRequest, SereneRequestParseOptions, SereneRequestPrepareOptions } from "serene-front";
import { GoogleMapsApiKey } from "../api-key";
import { parsePollenForecast, PollenForecast } from "./models";
import { LocationCoordinates } from "serene-front/data";

/**
 * The pollen API services url.
 */
const pollenApiUrl = "https://pollen.googleapis.com";

/**
 * Object specifying how to request daily pollen information.
 */
export interface PollenForecastOptions {
    /**
     * The longitude and latitude from which the API searches for pollen forecast data.
     */
    readonly location: LocationCoordinates;

    /**
     * A number that indicates how many forecast days to request (minimum value 1, maximum value is 5).
     */
    readonly days: number;

    /**
     * The maximum number of daily info records to return per page. The default and max value is 5 (5 days of data).
     */
    readonly pageSize?: number;

    /**
     * A page token received from a previous daily call. It is used to retrieve the subsequent page.
     */
    readonly pageToken?: string;

    /**
     * Allows the client to choose the language for the response. If data cannot be provided for that language 
     * the API uses the closest match. Allowed values rely on the IETF BCP-47 standard.
     */
    readonly languageCode?: string;

    /**
     * Contains general information about plants, including details on their seasonality, special shapes and colors, 
     * information about allergic cross-reactions, and plant photos.
     */
    readonly plantsDescription?: boolean;
}

/**
 * Request daily pollen information using the forecast endpoint.
 */
export class GetPollenForecast implements SereneRequest<GoogleMapsApiKey, PollenForecast> {
    constructor(
        private readonly options: PollenForecastOptions
    ) { }

    prepare({ }: SereneRequestPrepareOptions<GoogleMapsApiKey>): Request {
        const url = new URL(`${pollenApiUrl}/v1/forecast:lookup`);
        url.searchParams.set("location.latitude", String(this.options.location.latitude));
        url.searchParams.set("location.longitude", String(this.options.location.longitude));
        url.searchParams.set("days", String(this.options.days));
        if (this.options.pageSize !== undefined) {
            url.searchParams.set("pageSize", String(this.options.pageSize));
        }
        if (this.options.pageToken !== undefined) {
            url.searchParams.set("pageToken", this.options.pageToken);
        }
        if (this.options.languageCode !== undefined) {
            url.searchParams.set("languageCode", this.options.languageCode);
        }
        if (this.options.plantsDescription !== undefined) {
            url.searchParams.set("plantsDescription", String(this.options.plantsDescription));
        }
        return new Request(url);
    }

    async parse({ fetchResponse }: SereneRequestParseOptions<GoogleMapsApiKey>): Promise<PollenForecast> {
        const json = await fetchResponse.text();
        return parsePollenForecast(json);
    }
}
