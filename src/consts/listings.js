const listings = [
  {
    id: "1",
    title: "Need 2-3 roommates in 4 bedroom house",
    location: "East Side Los Angeles",
    total_rent: "1500$",
    image: require("../assets/homescreen/listing1.jpg"),
    bedrooms: "2",
    bathrooms: "2",
    square_footage: "654 sq ft",
    description: `This building is located in the Oliver area, withing walking distance of shops...`,
    interiors: [
      require("../assets/homescreen/interior1.jpg"),
      require("../assets/homescreen/interior2.jpg"),
      require("../assets/homescreen/interior3.jpg"),
    ],
  },
  {
    id: "2",
    title: "Private room in house 1 person",
    location: "Down town house suite Los Angeles",
    total_rent: "1200$",
    bedrooms: "1",
    bathrooms: "1",
    square_footage: "211 sq ft",
    image: require("../assets/homescreen/listing2.jpg"),
    description: `This building is located in the Oliver area, withing walking distance of shops...`,
    interiors: [
      require("../assets/homescreen/interior1.jpg"),
      require("../assets/homescreen/interior2.jpg"),

      require("../assets/homescreen/interior3.jpg"),
    ],
  },
  {
    id: "3",
    title: "Entire bedroom/bath combo",
    total_rent: "1800$",
    location: "3Mins to Skytrain/Garden/Stadium/100% California",
    bedrooms: "3",
    bathrooms: "3",
    square_footage: "800 sq ft",
    image: require("../assets/homescreen/listing3.jpg"),
    description: `This building is located in the Oliver area, withing walking distance of shops...`,
    interiors: [
      require("../assets/homescreen/interior1.jpg"),
      require("../assets/homescreen/interior2.jpg"),
      require("../assets/homescreen/interior3.jpg"),
    ],
  },
  {
    id: "4",
    title: "Private room in apartment",
    total_rent: "1300$",
    location: "Small room in cozy DTLA apartment! California",
    bedrooms: "1",
    bathrooms: "1",
    square_footage: "150 sq ft",
    image: require("../assets/homescreen/listing4.jpg"),
    description: `This building is located in the Oliver area, withing walking distance of shops...`,
    interiors: [
      require("../assets/homescreen/interior1.jpg"),
      require("../assets/homescreen/interior2.jpg"),
      require("../assets/homescreen/interior3.jpg"),
    ],
  },
];

export default listings;
