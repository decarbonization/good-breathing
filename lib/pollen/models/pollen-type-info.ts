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

import { IndexInfo, PollenType } from "./base";

/**
 * This object contains the pollen type index and health recommendation information on specific pollen type.
 */
export interface PollenTypeInfo {
    /**
     * The pollen type's code name. For example: "GRASS"
     */
    readonly code: PollenType;

    /**
     * A human readable representation of the pollen type name. Example: "Grass"
     */
    readonly displayName: string;

    /**
     * Contains the Universal Pollen Index (UPI) data for the pollen type.
     */
    readonly indexInfo: IndexInfo;

    /**
     * Textual list of explanations, related to health insights based on the current pollen levels.
     */
    readonly healthRecommendations: string[],

    /**
     * Indication whether the plant is in season or not.
     */
    readonly inSeason: boolean;
}
