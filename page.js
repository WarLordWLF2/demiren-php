"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faGoogle } from "@fortawesome/free-brands-svg-icons";
import {
  faWifi,
  faConciergeBell,
  faUserFriends,
  faSmokingBan,
  faParking,
  faUtensils,
  faBreadSlice,
  faBath,
  faBed,
  faKitchenSet,
  faTv,
  faWineGlass,
  faLanguage,
  faHandHoldingHeart,
  faShieldAlt,
  faCogs,
  faWheelchair,
} from "@fortawesome/free-solid-svg-icons";


import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { useRouter } from "next/navigation";
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"
import { Popover, PopoverContent, PopoverTrigger, PopoverAnchor, PopoverTitle } from "@/components/ui/popover";
import { format} from "date-fns"
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import Header from "@/components/layout/header";
import Footer from "@/components/layout/footer";



export default function Home() {
  const router = useRouter();
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [childrenAges, setChildrenAges] = useState([]);

  
  
  const amenities = [
    { icon: faWifi, text: "Free WiFi" },
    { icon: faConciergeBell, text: "Room Service" },
    { icon: faUserFriends, text: "Family Rooms" },
    { icon: faSmokingBan, text: "Non-Smoking" },
    { icon: faParking, text: "Free Parking" },
    { icon: faUtensils, text: "Restaurant" },
    { icon: faBreadSlice, text: "Breakfast" },
    { icon: faHandHoldingHeart, text: "Great for your stay" },
    { icon: faBath, text: "Bathroom" },
    { icon: faBed, text: "Bedroom" },
    { icon: faKitchenSet, text: "Kitchen" },
    { icon: faTv, text: "Media & Technology" },
    { icon: faWineGlass, text: "Food & Drink" },
    { icon: faLanguage, text: "Languages Spoken" },
    { icon: faCogs, text: "Services" },
    { icon: faShieldAlt, text: "Safety & Security" },
    { icon: faCogs, text: "General" },
    { icon: faWheelchair, text: "Accessibility" },
  ];


  const images = [
    "/images/image1.jpg",
    "/images/image2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
  ]

  
  const galleryImages = {
    roomPhotos: [
      "/images/room1.jpg",
      "/images/room2.jpg",
      "/images/room3.jpg",
    ],
    meetingPhotos: [
      "/images/meeting1.jpg",
      "/images/meeting2.jpg",
      "/images/meeting3.jpg",
    ],
  };


  const handleChildrenChange = (newCount) => {
    if (newCount > children) {
      // Add default age (0) for new children
      setChildrenAges([...childrenAges, 0]);
    } else {
      // Remove the last child's age when reducing
      setChildrenAges(childrenAges.slice(0, newCount));
    }
    setChildren(newCount);
  };

  // Handle selecting age for a specific child
  const handleAgeChange = (index, age) => {
    const updatedAges = [...childrenAges];
    updatedAges[index] = age;
    setChildrenAges(updatedAges);
  };

  useEffect(() => {
    sessionStorage.setItem("webAPI", "http://localhost/demiren_API/web-side.php");
  })


  return (
    
    <div className="min-h-screen flex flex-col">

{/* Header */}
<Header />

{/* Section 1 */}
<section id="home" className="px-10 py-8 flex flex-col items-center gap-4 mt-[200px] mb-[380px]">
  <div className="p-8 flex flex-col items-center gap-10">
  
<motion.h1
  initial={{ opacity: 0, y: -15 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, ease: "easeOut" }}
  className="text-6xl font-bold text-white"
>
  WELCOME TO DEMIREN HOTEL
</motion.h1>
  <div className="flex flex-wrap gap-4 items-end">
  {/* Check-in Date */}
  <div className="flex-1 min-w-[200px] text-white">
    <label className="text-sm font-medium mb-1 block">Check-in Date</label>
    <Popover>
      <PopoverTrigger asChild> 
        <Button variant="outline" className="w-full text-left">
          {checkInDate ? format(checkInDate, "PPP") : "Select Check-in Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={checkInDate}
          onSelect={setCheckInDate}
          disabled={(date) => date < new Date()}
        />
      </PopoverContent>
    </Popover>
  </div>

  {/* Check-out Date */}
  <div className="flex-1 min-w-[200px] text-white">
    <label className="text-sm font-medium mb-1 block ">Check-out Date</label>
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-full text-left">
          {checkOutDate ? format(checkOutDate, "PPP") : "Select Check-out Date"}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start">
        <Calendar
          mode="single"
          selected={checkOutDate}
          onSelect={setCheckOutDate}
          disabled={(date) => !checkInDate || date <= checkInDate}
        />
      </PopoverContent>
    </Popover>
  </div>

  {/* Room Selection */}
  <div className="flex-1 min-w-[200px]">
      <label className="text-sm font-medium mb-1 block text-white">Room</label>

      {/* Popover Trigger */}
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full text-left">
            {adults} adults · {children} children · {rooms} room
          </Button>
        </PopoverTrigger>

        {/* Popover Content */}
        <PopoverContent align="start" className="w-64 bg-white p-4 rounded-lg shadow-md">
          <div className="flex flex-col gap-3 text-black">
            {/* Adults */}
            <div className="flex justify-between items-center">
              <span>Adults</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setAdults(Math.max(1, adults - 1))}>-</Button>
                <span>{adults}</span>
                <Button variant="outline" size="icon" onClick={() => setAdults(adults + 1)}>+</Button>
              </div>
            </div>

            {/* Children */}
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span>Children</span>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" onClick={() => handleChildrenChange(Math.max(0, children - 1))}>-</Button>
                  <span>{children}</span>
                  <Button variant="outline" size="icon" onClick={() => handleChildrenChange(children + 1)}>+</Button>
                </div>
              </div>

              {/* Age Dropdowns for Each Child */}
              {childrenAges.map((age, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span>Child {index + 1} Age</span>
                  <select
                    className="border rounded p-1"
                    value={age}
                    onChange={(e) => handleAgeChange(index, parseInt(e.target.value))}
                  >
                    {[...Array(18).keys()].map((num) => (
                      <option key={num} value={num}>{num} years</option>
                    ))}
                  </select>
                </div>
              ))}
            </div>

            {/* Rooms */}
            <div className="flex justify-between items-center">
              <span>Rooms</span>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={() => setRooms(Math.max(1, rooms - 1))}>-</Button>
                <span>{rooms}</span>
                <Button variant="outline" size="icon" onClick={() => setRooms(rooms + 1)}>+</Button>
              </div>
            </div>

            {/* Done Button */}
            <Button className="w-full bg-[#213555] text-white mt-2 hover:bg-blue-600">Done</Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>

  {/* Search Button (Now Positioned Lower) */}
  <div className="flex-1 min-w-[200px] flex self-end">
    <Button className=" bg-[#213555] text-white px-4 py-2 rounded-lg hover:bg-[#324A65]">
      Search
    </Button>
  </div>
</div>

  </div>
</section>

{/* Section 2: Carousel with Images */}
<section id="about" className="bg-[#213555] text-white py-16 px-6 md:px-16">
  <div className="text-center mb-12">
  <h2 className="text-lg text-gray-500 tracking-widest">ABOUT US</h2>
  </div>

  <div className="flex flex-col md:flex-row items-start justify-between gap-4">
    {/* Left Column - About Us Text */}
    <div className="md:w-1/2 max-w-[600px]">
      <p className="text-lg leading-relaxed">
        At <span className="font-semibold">Demiren Hotel and Restaurant</span>, we are committed to providing 
        exceptional services to our valued customers. Located in the heart of 
        <span className="font-semibold"> Tiano Kalambaguhan Street, Brgy 14, Cagayan de Oro City</span>, 
        we strive to deliver quality, comfort, and a memorable experience.
      </p>
      <p className="text-lg mt-6 leading-relaxed">
        Founded in <span className="font-semibold">1963</span>, our journey began with a passion for hospitality. 
        Over the years, we have grown into a trusted name, known for our dedication to excellence 
        and customer satisfaction.
      </p>

    
    </div>

    {/* Right Column - Images */}
    <div className="md:w-1/2 flex flex-col items-center gap-4">
      <Image 
        src="/assets/restau.jpg" 
        alt="Restaurant" 
        width={600} 
        height={350} 
        className="rounded-lg shadow-lg"
      />
      <Image 
        src="/assets/hotel.jpg" 
        alt="Hotel Facilities" 
        width={600} 
        height={350} 
        className="rounded-lg shadow-lg"
      />
    </div>
  </div>
</section>




{/* Section 3: hotel facilities */}
<section id ="facilities" className="flex flex-col items-center text-center">
<h2 className="text-lg text-white tracking-widest mt-12">FACILITIES OF DEMIREN HOTEL</h2>

  <div className="mt-6 w-full max-w-7xl">
    <p className="text-lg font-semibold text-white">Most popular facilities</p>

    <div className="flex justify-center">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-6">
  {amenities.map((amenity, index) => (
    <div
      key={index}
      className="flex flex-col items-center justify-center border border-gray-300 rounded-2xl p-6 shadow-lg bg-gradient-to-b from-white  bg-[#F5EFE7] w-44 h-44 transition-transform duration-300 hover:scale-105"
    >
      <div className="bg-[#3E5879] p-3 rounded-full shadow-md">
        <FontAwesomeIcon icon={amenity.icon} className="w-12 h-12 text-white" />
      </div>
      <p className="text-md mt-3 text-black font-semibold">{amenity.text}</p>
    </div>
  ))}
</div>
    </div>
  </div>
</section>


{/* Section 4: Gallery */}
<section id="gallery" className="flex flex-col items-center text-center bg-[#F5EFE7] p-8">
      {/* Gallery Title */}
      <h2 className="text-lg text-gray-500 tracking-widest">GALLERY</h2>

      {/* Room Photos */}
      <h1 className="text-4xl font-semibold text-[#826A4A] mt-2">ROOM PHOTOS</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryImages.roomPhotos.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img src={image} alt={`Room ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>

      {/* Divider */}
      <div className="w-full border-t border-gray-300 my-10"></div>

      {/* Meeting Room Photos */}
      <h1 className="text-4xl font-semibold text-[#826A4A]">FUNCTION/MEETING ROOM PHOTOS</h1>
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {galleryImages.meetingPhotos.map((image, index) => (
          <div key={index} className="overflow-hidden rounded-lg shadow-md">
            <img src={image} alt={`Meeting Room ${index + 1}`} className="w-full h-auto object-cover" />
          </div>
        ))}
      </div>
    </section>



{/* Section 5: FQnA */}
<section className="bg-[#F5EFE7] p-8">
  <div className="flex flex-col lg:flex-row gap-8">
    {/* Left Column - Image */}
    <div className="flex-1">
      <img src="/path/to/your/image.jpg" alt="Hotel Image" className="w-full h-auto rounded-lg" />
    </div>

    {/* Right Column - FAQ */}
    <div className="flex-1">
      <Card className="p-8 lg:p-12">
        <h2 className="text-2xl font-bold">Frequently Asked Questions</h2>
        <div >
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-sm font-semibold">
                Is Demiren Hotel popular with families?
              </AccordionTrigger>
              <AccordionContent>
                Yes, Demiren Hotel is popular with guests booking family stays.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-sm font-semibold">
                How much does it cost to stay at Demiren Hotel?
              </AccordionTrigger>
              <AccordionContent>
                The prices at Demiren Hotel may vary depending on your stay (e.g., dates you select, hotel`s policy etc.). See the prices by entering your dates.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-sm font-semibold">
                How far is Demiren Hotel from the centre of Cagayan de Oro?
              </AccordionTrigger>
              <AccordionContent>
                Demiren Hotel is 850 m from the centre of Cagayan de Oro. All distances are measured in straight lines. Actual travel distances may vary.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-sm font-semibold">
                What is there to do at Demiren Hotel?
              </AccordionTrigger>
              <AccordionContent>
                Demiren Hotel offers the following activities / services (charges may apply):
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-sm font-semibold">
                Does Demiren Hotel have a restaurant on site?
              </AccordionTrigger>
              <AccordionContent>
                Demiren Hotel has 1 restaurant:
                <ul className="list-disc list-inside">
                  <li>Restaurant #1</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger className="text-sm font-semibold">
                What are the check-in and check-out times at Demiren Hotel?
              </AccordionTrigger>
              <AccordionContent>
                Check-in at Demiren Hotel is from 12:00, and check-out is until 1:00PM.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-7">
              <AccordionTrigger className="text-sm font-semibold">
                What type of room can I book at Demiren Hotel?
              </AccordionTrigger>
              <AccordionContent>
                Room options at Demiren Hotel include:
                <ul className="list-disc list-inside">
                  <li>Twin</li>
                  <li>Double</li>
                  <li>Triple</li>
                  <li>Family</li>
                  <li>Single</li>
                  <li>Quadruple</li>
                </ul>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </Card>
    </div>
  </div>
</section>

          
{/* Section 6: Footer */}
<section className="bg-gray-800 text-white p-4 mt-8">
<Footer />
    </section>
  
    </div>
  );
}