'use client';
import React, { Fragment, useState } from "react";
import Datepicker, { DateRangeType, DateValueType } from "react-tailwindcss-datepicker";
import { Transition } from '@headlessui/react'
import { CheckCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'


export default function TravelForm() {
    const [firstName, setFirstName] = useState("");
    const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFirstName(e.target.value);
    };

    const [lastName, setLastName] = useState("");
    const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLastName(e.target.value);
    };

    const [email, setEmail] = useState("");
    const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const [country, setCountry] = useState("");
    const handleCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCountry(e.target.value);
    };

    const [price, setPrice] = useState("");
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPrice(e.target.value);
    };

    const [currency, setCurrency] = useState("CAD");
    const handleCurrencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCurrency(e.target.value);
    };

    const [date, setDate] = useState<DateRangeType | null>(null);
    const handleDateChange = (value: DateValueType) => {
        setDate(value as DateRangeType);
    };

    const [suggestion, setSuggestion] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const fetchTravelSuggestions = async () => {
        setIsLoading(true);
        const bodyPOST = JSON.stringify(
            {
                firstName: firstName,
                lastName: lastName,
                email: email,
                country: country,
                price: price,
                currency: currency,
                startDate: date?.startDate,
                endDate: date?.endDate
            }
        )

        const response = await fetch('http://localhost:8080/travel/suggestions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: bodyPOST
        });
        const data = await response.json();
        setSuggestion(data.message);
        setIsLoading(false);
    }

    return (
        <>
            <form>
                <div className="space-y-12">
                    <h2 className="text-2xl font-semibold leading-7 text-gray-900">Travel app</h2>

                    <div className="border-b border-gray-900/10 pb-12">
                        <p className="mt-1 text-sm leading-6 text-gray-600">Complete these informations to find your ideal travel itinerary!</p>

                        <h2 className="mt-10 text-base font-semibold leading-10 text-gray-900">Personal Information</h2>
                        <div className="mt-1 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                                <label htmlFor="first-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    First name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="first-name"
                                        id="first-name"
                                        autoComplete="given-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={firstName}
                                        onChange={handleFirstNameChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="last-name" className="block text-sm font-medium leading-6 text-gray-900">
                                    Last name
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="last-name"
                                        id="last-name"
                                        autoComplete="family-name"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={lastName}
                                        onChange={handleLastNameChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-6">
                                <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={email}
                                        onChange={handleEmailChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="country" className="block text-sm font-medium leading-6 text-gray-900">
                                    Country
                                </label>
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        name="country"
                                        id="country"
                                        autoComplete="country"
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        value={country}
                                        onChange={handleCountryChange}
                                    />
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 text-gray-900">
                                    Price
                                </label>
                                <div className="relative mt-2 rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm">$</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="price"
                                        id="price"
                                        className="block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        placeholder="0.00"
                                        value={price}
                                        onChange={handlePriceChange}
                                    />
                                    <div className="absolute inset-y-0 right-0 flex items-center">
                                        <label htmlFor="currency" className="sr-only">
                                            Currency
                                        </label>
                                        <select
                                            id="currency"
                                            name="currency"
                                            className="h-full rounded-md border-0 bg-transparent py-0 pl-2 pr-7 text-gray-500 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                            value={currency}
                                            onChange={handleCurrencyChange}
                                        >
                                            <option>CAD</option>
                                            <option>USD</option>
                                            <option>EUR</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:col-span-3">
                                <label htmlFor="price" className="block text-sm font-medium leading-6 mb-2 text-gray-900">
                                    Date of departure
                                </label>
                                <Datepicker
                                    value={date}
                                    onChange={handleDateChange}
                                    showShortcuts={true}
                                />
                            </div>

                        </div>
                        {isLoading && (
                            <div
                                aria-live="assertive"
                                className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
                            >
                                <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
                                    {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
                                    <Transition
                                        show={isLoading}
                                        as={Fragment}
                                        enter="transform ease-out duration-300 transition"
                                        enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
                                        enterTo="translate-y-0 opacity-100 sm:translate-x-0"
                                        leave="transition ease-in duration-100"
                                        leaveFrom="opacity-100"
                                        leaveTo="opacity-0"
                                    >
                                        <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
                                            <div className="p-4">
                                                <div className="flex items-start">
                                                    <div className="flex-shrink-0">
                                                    <svg className="animate-spin h-5 w-5 mr-3 ..." viewBox="0 0 24 24">
                                                                <circle
                                                                    className="opacity-10"
                                                                    cx="12"
                                                                    cy="12"
                                                                    r="10"
                                                                    stroke="currentColor"
                                                                    strokeWidth="4"
                                                                ></circle>
                                                                <path
                                                                    className="opacity-85"
                                                                    fill="#4e46e5"
                                                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                                                ></path>
                                                            </svg>
                                                    </div>
                                                    <div className="ml-3 w-0 flex-1 pt-0.5">
                                                        <p className="text-sm font-medium text-gray-900">Successfully received!</p>
                                                        <p className="mt-1 text-sm text-gray-500">Your travel plan is being generated. ✈️</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Transition>
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex items-center justify-end gap-x-6">
                            <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                                Delete all
                            </button>
                            <button
                                type="submit"
                                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                onClick={(e) => {
                                    e.preventDefault();
                                    fetchTravelSuggestions();
                                }}
                            >
                                Generate
                            </button>
                        </div>
                    </div>

                    <div className="border-b border-gray-900/10 pb-12">
                        <p className="mt-1 text-sm leading-6 text-gray-600">
                            Below you will find the summary of your travel itinerary!
                        </p>
                        <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">

                            <div className="col-span-full">
                                <label htmlFor="about" className="block text-sm font-medium leading-6 text-gray-900">
                                    Summary
                                </label>
                                <div className="mt-2">
                                    <textarea
                                        id="about"
                                        name="about"
                                        rows={5}
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                        defaultValue={suggestion}
                                        disabled

                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-end gap-x-6">
                    <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                    </button>
                    <button
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </>
    )
}
