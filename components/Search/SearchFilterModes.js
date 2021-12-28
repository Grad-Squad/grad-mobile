import { IconNames } from "common/Icon/Icon";

export const POST =
    [
        {
            title: 'Material Type',
            searchable: false,
            icon: IconNames.cards,
            values: [
                "Flashcards",
                "MCQ",
                "PDF",
                "Images",
                "Videos"
            ]
        },
        {
            title: 'Date',
            searchable: false,
            icon: IconNames.date,
            values: [
                "Today",
                "Past Week",
                "Past Month",
                "Past Year",
                "All Time",
            ]
        },
        {
            title: 'Subject',
            searchable: true,
            icon: IconNames.subject,
            values: [
                "IDK",
                "HOW",
                "TO",
                "DO",
                "THIS",
            ]
        },
        {
            title:'Post Price',
            searchable: false,
            icon: IconNames.dollarSign,
            values: [
                "Paid",
                "Free",
            ]
        },
        {
            title: 'Sort By',
            searchable: false,
            icon: IconNames.sort,
            values: [
                "date newer first",
                "date older first",
                "rating",
                "title",
            ]
        },
    ]
export const PEOPLE = [
        {
            title: 'Follow_Status',
            searchable: false,
            icon: IconNames.followStatus,
            values: [
                "Followed",
                "Not Followed",
            ]
        },
        {
            title: 'Role',
            searchable: false,
            icon: IconNames.role,
            values: [
                "Teacher",
                "Student",
            ]
        },
        {
            title: 'Sort_By',
            searchable: false,
            icon: IconNames.sort,
            values: [
                "name",
                "followers",
            ]
        },
]