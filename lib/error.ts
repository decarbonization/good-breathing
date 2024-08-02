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

import { RESTError } from "serene-front";

/**
 * Object containing information about an error which occurred 
 * when interacting with the Google Maps platform.
 */
export class GoogleMapsError extends RESTError {
}

/**
 * An error response.
 */
export interface ErrorResponse {
    /**
     * The details of the error.
     */
    readonly error: ErrorDetails;
}

export interface ErrorDetails {
    /**
     * The status code of the error.
     */
    readonly code: number;

    /**
     * A developer-readable message describing the error.
     */
    readonly message: string;

    /**
     * The status of the error.
     */
    readonly status: string;
}

/**
 * Create a `ErrorResponse` object from a given JSON representation.
 * 
 * @param raw A string containing a JSON representation of a `ErrorResponse` object.
 * @returns A parsed `ErrorResponse` object ready for use.
 */
export function parseErrorResponse(json: string): ErrorResponse {
    const object = JSON.parse(json);
    return object as ErrorResponse;
}
