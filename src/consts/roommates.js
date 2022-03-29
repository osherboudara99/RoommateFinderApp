const listings = [
  {
    id: "1",
    title: "Slippser Klothezoff",
    location: "West Los Angeles",
    budget: "600$",
    image: require("../assets/homescreen/roommate1.jpg"),
    details: `I will be a very good roommate...`,
    petFriendly: true,
    smokingFriendly: false,
    zoomFriendly: true,
    personalityTypeName: "The Architect",

    student: true,
    workingProfessional: false,
    guestsOften: 1,
	jobTitle: "Architecture Firm Designer",
	roommateStatus: "Seeking Roommates",
	cleanliness: 8,
	
	

    interiors: [
      require("../assets/homescreen/roommate1_pic1.jpg"),
      require("../assets/homescreen/roommate1_pic2.jpg"),
      require("../assets/homescreen/roommate1_pic3.jpg"),
    ],
  },
  {
    id: "2",
    title: "Lota Miles",
    location: "Down town Los Angeles",
    budget: "500$",
    petFriendly: false,
    smokingFriendly: false,
    zoomFriendly: true,

    personalityTypeName: "The Adventurer",

    student: false,
    workingProfessional: true,
    guestsOften: 0,
	jobTitle: "Professional Dancer",
	roommateStatus: "Seeking Roommates",
	cleanliness: 9,

    image: require("../assets/homescreen/roommate2.jpg"),
    details: `Super clean, fun, friendly and outgoing.`,
    interiors: [
      require("../assets/homescreen/roommate2_pic1.jpg"),
      require("../assets/homescreen/roommate2_pic2.jpg"),
      require("../assets/homescreen/roommate2_pic3.jpg"),
    ],
  },
  {
    id: "3",
    title: "Marty McMuscles",
    location: "San Fernando Valley",
    budget: "400$",
    petFriendly: false,
    smokingFriendly: true,
    zoomFriendly: true,

    personalityTypeName: "The Sentinel",

    student: false,
    workingProfessional: true,
    guestsOften: 2,
	jobTitle: "Architecture Firm Designer",
	roommateStatus: "Seeking Roommates",
	cleanliness: 5,

    image: require("../assets/homescreen/roommate3.jpg"),
    details: `Only need a place to sleep and create ideas!`,
    interiors: [
      require("../assets/homescreen/roommate3_pic1.jpg"),
      require("../assets/homescreen/roommate3_pic2.jpg"),
      require("../assets/homescreen/roommate3_pic3.jpg"),
    ],
  },
  {
    id: "4",
    title: "Cherry Rain",
    budget: "700$",
    location: "Venice California",
    petFriendly: true,
    smokingFriendly: false,
    zoomFriendly: true,

    student: true,
    workingProfessional: false,
    guestsOften: 3,
	jobTitle: "Architecture Firm Designer",
	roommateStatus: "Seeking Roommates",
	cleanliness: 4,

    personalityTypeName: "The Entertainer",

    image: require("../assets/homescreen/roommate4.jpg"),
    details: `Outgoing, loves to party and goes to festivals often.`,
    interiors: [
      require("../assets/homescreen/roommate1_pic1.jpg"),
      require("../assets/homescreen/roommate1_pic2.jpg"),
      require("../assets/homescreen/roommate1_pic3.jpg"),
    ],
  },
];

export default listings;
