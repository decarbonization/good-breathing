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
import { ColorPalette, CurrentAirConditions, CustomLocalAqi, ExtraComputation, parseCurrentAirConditions } from "./models";
import { LocationCoordinates } from "serene-front/data";

/**
 * The air quality API services url.
 */
const airQualityApiUrl = "https://airquality.googleapis.com";

/**
 * Object specifying how to fetch current air conditions.
 */
export interface CurrentAirConditionsOptions {
    /**
     * The longitude and latitude from which the API looks for air quality current conditions data.
     */
    readonly location: LocationCoordinates;

    /**
     * Additional features that can be optionally enabled. Specifying extra computations 
     * will result in the relevant elements and fields to be returned in the response.
     */
    readonly extraComputations?: ExtraComputation[];

    /**
     * Determines the color palette used for data provided by the 'Universal Air Quality Index' (UAQI).
     * This color palette is relevant just for UAQI, other AQIs have a predetermined color palette that can't be controlled.
     */
    readonly uaqiColorPalette?: ColorPalette;

    /**
     * Expresses a 'country/region to AQI' relationship.
     * 
     * Pairs a country/region with a desired AQI so that air quality data that is required for 
     * that country/region will be displayed according to the chosen AQI. This parameter can be used 
     * to specify a non-default AQI for a given country, for example, to get the US EPA index for Canada 
     * rather than the default index for Canada.
     */
    readonly customLocalAqis?: CustomLocalAqi[];

    /**
     * If set to true, the Universal AQI will be included in the 'indexes' field of the response.
     * 
     * Default value is `true`.
     */
    readonly universalAqi?: boolean;

    /**
     * Allows the client to choose the language for the response.
     * 
     * If data cannot be provided for that language the API uses the closest match.
     * Allowed values rely on the IETF standard.
     * 
     * Default value is `en`.
     */
    readonly languageCode?: string;
}

/**
 * The Current Conditions endpoint provides hourly air quality information in more than 100 countries,
 * up to a 500 x 500 meters resolution. Includes over 70 local indexes and global air quality index and categories.
 */
export class GetCurrentAirConditions implements SereneRequest<GoogleMapsApiKey, CurrentAirConditions> {
    constructor(
        private readonly options: CurrentAirConditionsOptions
    ) { }

    prepare({ }: SereneRequestPrepareOptions<GoogleMapsApiKey>): Request {
        const url = new URL(`${airQualityApiUrl}/v1/currentConditions:lookup`);
        const body = JSON.stringify(this.options);
        return new Request(url, { method: "POST", body });
    }

    async parse({ fetchResponse }: SereneRequestParseOptions<GoogleMapsApiKey>): Promise<CurrentAirConditions> {
        const json = await fetchResponse.text();
        return parseCurrentAirConditions(json);
    }
}
