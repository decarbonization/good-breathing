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

/**
 * Pollen Type Code.
 */
export const enum PollenType {
    /**
     * Unspecified plant type.
     */
    unspecified = "POLLEN_TYPE_UNSPECIFIED",

    /**
     * Grass pollen type.
     */
    grass = "GRASS",

    /**
     * Tree pollen type.
     */
    tree = "TREE",

    /**
     * Weed pollen type.
     */
    weed = "WEED",
}

/**
 * This object contains data representing specific pollen index value, category and description.
 */
export interface IndexInfo {
    /**
     * The index's code. This field represents the index for programming purposes 
     * by using snake cases instead of spaces. Example: "UPI".
     */
    readonly code: Index;

    /**
     * A human readable representation of the index name. Example: "Universal Pollen Index".
     */
    readonly displayName: string;

    /**
     * Text classification of index numerical score interpretation.
     * 
     * The index consists of six categories:
     * 
     * 0. "None"
     * 1. "Very low"
     * 2. "Low"
     * 3. "Moderate"
     * 4. "High"
     * 5. "Very high"
     */
    readonly category: string;

    /**
     * Textual explanation of current index level.
     */
    readonly indexDescription: string;

    /**
     * The color used to represent the Pollen Index numeric score.
     */
    readonly color: Color;

    /**
     * The index's numeric score. Numeric range is between 0 and 5.
     */
    readonly value: number;
}

/**
 * Index Code.
 */
export const enum Index {
    /**
     * Unspecified index.
     */
    unspecified = "INDEX_UNSPECIFIED",

    /**
     * Universal Pollen Index.
     */
    upi = "UPI",
}
