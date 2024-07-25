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

import { Color } from "../../color";

/**
 * The basic object for representing different air quality metrics.
 */
export interface AirQualityIndex {
    /**
     * The index's code.
     * 
     * This field represents the index for programming purposes by using snake case instead of spaces.
     * Examples: "uaqi", "fra_atmo".
     */
    readonly code: string;

    /**
     * A human readable representation of the index name. Example: "AQI (US)"
     */
    readonly displayName: string;

    /**
     * Textual representation of the index numeric score, that may include prefix or suffix symbols,
     * which usually represents the worst index score. Example: >100 or 10+.
     * 
     * Note: This field should be used when you want to display the index score.
     * For non-numeric indexes, this field is empty
     */
    readonly aqiDisplay: string;

    /**
     * The color used to represent the AQI numeric score.
     */
    readonly color: Color;

    /**
     * Textual classification of the index numeric score interpretation. For example: "Excellent air quality".
     */
    readonly category: string;

    /**
     * The chemical symbol of the dominant pollutant. For example: "CO".
     */
    readonly dominantPollutant: string;

    /**
     * The index's numeric score. Examples: 10, 100.
     * 
     * The value is not normalized and should only be interpreted in the context of
     * its related air-quality index. For non-numeric indexes, this field will not be returned.
     * 
     * Note: This field should be used for calculations, graph display, etc.
     * For displaying the index score, you should use the AQI display field.
     */
    readonly aqi: number;
}
