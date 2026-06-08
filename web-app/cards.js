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
        tags: ["crane"]
    },
    {
        id: "jan-2",
        month: "January",
        category: "poetry slips",
        image: "assets/January_2.png",
        tags: ["red poetry slips"]
    },
    {
        id: "jan-3",
        month: "January",
        category: "chaff",
        image: "assets/January_3.png"
    },
    {
        id: "jan-4",
        month: "January",
        category: "chaff",
        image: "assets/January_4.png"
    },
    {
        id: "feb-1",
        month: "February",
        category: "chaff",
        image: "assets/February_1.png"
    },
    {
        id: "feb-2",
        month: "February",
        category: "chaff",
        image: "assets/February_2.png"
    },
    {
        id: "feb-3",
        month: "February",
        category: "poetry slips",
        image: "assets/February_3.png",
        tags: ["red poetry slips"]
    },
    {
        id: "feb-4",
        month: "February",
        category: "seeds",
        image: "assets/February_4.png"
    },
    {
        id: "mar-1",
        month: "March",
        category: "chaff",
        image: "assets/March_1.png"
    },
    {
        id: "mar-2",
        month: "March",
        category: "chaff",
        image: "assets/March_2.png"
    },
    {
        id: "mar-3",
        month: "March",
        category: "poetry slips",
        image: "assets/March_3.png",
        tags: ["red poetry slips"]
    },
    {
        id: "mar-4",
        month: "March",
        category: "bright",
        image: "assets/March_4.png",
        tags: ["curtain"]
    },
    {
        id: "apr-1",
        month: "April",
        category: "chaff",
        image: "assets/April_1.png"
    },
    {
        id: "apr-2",
        month: "April",
        category: "chaff",
        image: "assets/April_2.png"
    },
    {
        id: "apr-3",
        month: "April",
        category: "poetry slips",
        image: "assets/April_3.png",
        tags: ["red poetry slips"]
    },
    {
        id: "apr-4",
        month: "April",
        category: "seeds",
        image: "assets/April_4.png"
    },
    {
        id: "may-1",
        month: "May",
        category: "chaff",
        image: "assets/May_1.png"
    },
    {
        id: "may-2",
        month: "May",
        category: "chaff",
        image: "assets/May_2.png"
    },
    {
        id: "may-3",
        month: "May",
        category: "poetry slips",
        image: "assets/May_3.png",
        tags: ["red poetry slips"]
    },
    {
        id: "may-4",
        month: "May",
        category: "seeds",
        image: "assets/May_4.png"
    },
    {
        id: "jun-1",
        month: "June",
        category: "chaff",
        image: "assets/June_1.png"
    },
    {
        id: "jun-2",
        month: "June",
        category: "chaff",
        image: "assets/June_2.png"
    },
    {
        id: "jun-3",
        month: "June",
        category: "poetry slips",
        image: "assets/June_3.png",
        tags: ["blue poetry slips"]
    },
    {
        id: "jun-4",
        month: "June",
        category: "seeds",
        image: "assets/June_4.png",
        tags: ["butterfly"]
    },
    {
        id: "jul-1",
        month: "July",
        category: "chaff",
        image: "assets/July_1.png"
    },
    {
        id: "jul-2",
        month: "July",
        category: "chaff",
        image: "assets/July_2.png"
    },
    {
        id: "jul-3",
        month: "July",
        category: "poetry slips",
        image: "assets/July_3.png",
        tags: ["red poetry slips"]
    },
    {
        id: "jul-4",
        month: "July",
        category: "seeds",
        image:
        "assets/July_4.png",
        tags: ["boar"]
    },
    {
        id: "aug-1",
        month: "August",
        category: "chaff",
        image: "assets/August_1.png"
    },
    {
        id: "aug-2",
        month: "August",
        category: "chaff",
        image: "assets/August_2.png"
    },
    {
        id: "aug-3",
        month: "August",
        category: "seeds",
        image: "assets/August_3.png"
    },
    {
        id: "aug-4",
        month: "August",
        category: "bright",
        image: "assets/August_4.png",
        tags: ["moon"]
    },
    {
        id: "sep-1",
        month: "September",
        category: "chaff",
        image: "assets/September_1.png"
    },
    {
        id: "sep-2",
        month: "September",
        category: "chaff",
        image: "assets/September_2.png"
    },
    {
        id: "sep-3",
        month: "September",
        category: "poetry slips",
        image: "assets/September_3.png",
        tags: ["blue poetry slips"]
    },
    {
        id: "sep-4",
        month: "September",
        category: "seeds",
        image: "assets/September_4.png",
        tags: ["sake cup"]
    },
    {
        id: "oct-1",
        month: "October",
        category: "chaff",
        image: "assets/October_1.png"
    },
    {
        id: "oct-2",
        month: "October",
        category: "chaff",
        image: "assets/October_2.png"
    },
    {
        id: "oct-3",
        month: "October",
        category: "poetry slips",
        image: "assets/October_3.png",
        tags: ["blue poetry slips"]
    },
    {
        id: "oct-4",
        month: "October",
        category: "seeds",
        image: "assets/October_4.png",
        tags: ["deer"]
    },
    {
        id: "nov-1",
        month: "November",
        category: "chaff",
        image: "assets/November_1.png"
    },
    {
        id: "nov-2",
        month: "November",
        category: "poetry slips",
        image: "assets/November_2.png",
        tags: ["red poetry slips"]
    },
    {
        id: "nov-3",
        month: "November",
        category: "seeds",
        image: "assets/November_3.png"
    },
    {
        id: "nov-4",
        month: "November",
        category: "bright",
        image: "assets/November_4.png",
        tags: ["rain"]
    },
    {
        id: "dec-1",
        month: "December",
        category: "chaff",
        image: "assets/December_1.png"
    },
    {
        id: "dec-2",
        month: "December",
        category: "chaff",
        image: "assets/December_2.png"
    },
    {
        id: "dec-3",
        month: "December",
        category: "chaff",
        image: "assets/December_3.png"
    },
    {
        id: "dec-4",
        month: "December",
        category: "bright",
        image: "assets/December_4.png",
        tags: ["phoenix"]
    }
];

export {allcards};