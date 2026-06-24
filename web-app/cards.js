//import R from "./ramda.js";

/*
First create an array of all.
Define and catgeorise the cards.
As some cards can make up multiple Yakus,
catgeory is defined for all and tags are
defined where necessary.
*/

const allcards = [
    {
        id: "jan-1",
        month: "January",
        category: "bright",
        image: "assets/January_1.svg",
        tags: ["crane"],
        name: "January Crane"
    },
    {
        id: "jan-2",
        month: "January",
        category: "poetry slips",
        image: "assets/January_2.png",
        tags: ["red poetry slips"],
        name: "January Poetry Slip"
    },
    {
        id: "jan-3",
        month: "January",
        category: "chaff",
        image: "assets/January_3.png",
        name: "January Chaff 1"
    },
    {
        id: "jan-4",
        month: "January",
        category: "chaff",
        image: "assets/January_4.png",
        name: "January Chaff 2"
    },
    {
        id: "feb-1",
        month: "February",
        category: "chaff",
        image: "assets/February_1.png",
        name: "February Chaff 1"
    },
    {
        id: "feb-2",
        month: "February",
        category: "chaff",
        image: "assets/February_2.png",
        name: "February Chaff 2"
    },
    {
        id: "feb-3",
        month: "February",
        category: "poetry slips",
        image: "assets/February_3.png",
        tags: ["red poetry slips"],
        name: "February Red Poetry Slip"
    },
    {
        id: "feb-4",
        month: "February",
        category: "seeds",
        image: "assets/February_4.png",
        name: "February Seeds Bird"
    },
    {
        id: "mar-1",
        month: "March",
        category: "chaff",
        image: "assets/March_1.png",
        name: "March Chaff 1"
    },
    {
        id: "mar-2",
        month: "March",
        category: "chaff",
        image: "assets/March_2.png",
        name: "March Chaff 2"
    },
    {
        id: "mar-3",
        month: "March",
        category: "poetry slips",
        image: "assets/March_3.png",
        tags: ["red poetry slips"],
        name: "March Poetry Slip"
    },
    {
        id: "mar-4",
        month: "March",
        category: "bright",
        image: "assets/March_4.png",
        tags: ["curtain"],
        name: "March Bright Curtain"
    },
    {
        id: "apr-1",
        month: "April",
        category: "chaff",
        image: "assets/April_1.png",
        name: "April Chaff 1"
    },
    {
        id: "apr-2",
        month: "April",
        category: "chaff",
        image: "assets/April_2.png",
        name: "April Chaff 2"
    },
    {
        id: "apr-3",
        month: "April",
        category: "poetry slips",
        image: "assets/April_3.png",
        tags: ["red poetry slips"],
        name: "April Red Poetry Slip"
    },
    {
        id: "apr-4",
        month: "April",
        category: "seeds",
        image: "assets/April_4.png",
        name: "April Seeds Swallow"
    },
    {
        id: "may-1",
        month: "May",
        category: "chaff",
        image: "assets/May_1.png",
        name: "May Chaff 1"
    },
    {
        id: "may-2",
        month: "May",
        category: "chaff",
        image: "assets/May_2.png",
        name: "May Chaff 2"
    },
    {
        id: "may-3",
        month: "May",
        category: "poetry slips",
        image: "assets/May_3.png",
        tags: ["red poetry slips"],
        name: "May Red poetry Slip"
    },
    {
        id: "may-4",
        month: "May",
        category: "seeds",
        image: "assets/May_4.png",
        name: "May Seeds Dock "
    },
    {
        id: "jun-1",
        month: "June",
        category: "chaff",
        image: "assets/June_1.png",
        name: "June Chaff 1"
    },
    {
        id: "jun-2",
        month: "June",
        category: "chaff",
        image: "assets/June_2.png",
        name: "June Chaff 2"
    },
    {
        id: "jun-3",
        month: "June",
        category: "poetry slips",
        image: "assets/June_3.png",
        tags: ["blue poetry slips"],
        name: "June Blue Poetry Slip"
    },
    {
        id: "jun-4",
        month: "June",
        category: "seeds",
        image: "assets/June_4.png",
        tags: ["butterfly"],
        name: "June Seeds Butterfly"
    },
    {
        id: "jul-1",
        month: "July",
        category: "chaff",
        image: "assets/July_1.png",
        name: "July Chaff 1"
    },
    {
        id: "jul-2",
        month: "July",
        category: "chaff",
        image: "assets/July_2.png",
        name: "July Chaff 2"
    },
    {
        id: "jul-3",
        month: "July",
        category: "poetry slips",
        image: "assets/July_3.png",
        tags: ["red poetry slips"],
        name: "July Red Poetry Slips"
    },
    {
        id: "jul-4",
        month: "July",
        category: "seeds",
        image:
        "assets/July_4.png",
        tags: ["boar"],
        name: "July Red Poetry Slips"
    },
    {
        id: "aug-1",
        month: "August",
        category: "chaff",
        image: "assets/August_1.png",
        name: "August Chaff 1"
    },
    {
        id: "aug-2",
        month: "August",
        category: "chaff",
        image: "assets/August_2.png",
        name: "August Chaff 2"
    },
    {
        id: "aug-3",
        month: "August",
        category: "seeds",
        image: "assets/August_3.png",
        name: "August Seeds 3 Tailows"
    },
    {
        id: "aug-4",
        month: "August",
        category: "bright",
        image: "assets/August_4.png",
        tags: ["moon"],
        name: "August Bright Moon"
    },
    {
        id: "sep-1",
        month: "September",
        category: "chaff",
        image: "assets/September_1.png",
        name: "September Chaff 1"
    },
    {
        id: "sep-2",
        month: "September",
        category: "chaff",
        image: "assets/September_2.png",
        name: "September Chaff 2"
    },
    {
        id: "sep-3",
        month: "September",
        category: "poetry slips",
        image: "assets/September_3.png",
        tags: ["blue poetry slips"],
        name: "September Blue Poetry Slip"
    },
    {
        id: "sep-4",
        month: "September",
        category: "seeds",
        image: "assets/September_4.png",
        tags: ["sake cup"],
        name: "September Sake Cup"
    },
    {
        id: "oct-1",
        month: "October",
        category: "chaff",
        image: "assets/October_1.png",
        name: "October Chaff 1"
    },
    {
        id: "oct-2",
        month: "October",
        category: "chaff",
        image: "assets/October_2.png",
        name: "October Chaff 2"
    },
    {
        id: "oct-3",
        month: "October",
        category: "poetry slips",
        image: "assets/October_3.png",
        tags: ["blue poetry slips"],
        name: "October Blue Poetry Slips"
    },
    {
        id: "oct-4",
        month: "October",
        category: "seeds",
        image: "assets/October_4.png",
        tags: ["deer"],
        name: "October Seeds Deer"
    },
    {
        id: "nov-1",
        month: "November",
        category: "chaff",
        image: "assets/November_1.png",
        name: "November Chaff 1"
    },
    {
        id: "nov-2",
        month: "November",
        category: "poetry slips",
        image: "assets/November_2.png",
        tags: ["red poetry slips"],
        name: "November Red Poetry Slip"
    },
    {
        id: "nov-3",
        month: "November",
        category: "seeds",
        image: "assets/November_3.png",
        name: "November Seeds Bird Flying"
    },
    {
        id: "nov-4",
        month: "November",
        category: "bright",
        image: "assets/November_4.png",
        tags: ["rain"],
        name: "November Bright Rain"
    },
    {
        id: "dec-1",
        month: "December",
        category: "chaff",
        image: "assets/December_1.png",
        name: "December Chaff 1"
    },
    {
        id: "dec-2",
        month: "December",
        category: "chaff",
        image: "assets/December_2.png",
        name: "December Chaff 2"
    },
    {
        id: "dec-3",
        month: "December",
        category: "chaff",
        image: "assets/December_3.png",
        name: "December Chaff 3"
    },
    {
        id: "dec-4",
        month: "December",
        category: "bright",
        image: "assets/December_4.png",
        tags: ["phoenix"],
        name: "December Bright Pheonix"
    }
];

export {allcards};

