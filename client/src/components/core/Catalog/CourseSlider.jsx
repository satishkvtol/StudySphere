import React from 'react'

import {Swiper, SwiperSlide} from "swiper/react"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/pagination"
import { FreeMode, Pagination}  from 'swiper/modules'

import Course_Card from './Course_Card'

const CourseSlider = ({Courses}) => {
  const dummyCourses = [
    {
      _id: "m1",
      thumbnail: "https://placehold.co/600x400/1F2937/FFFFFF?text=Upcoming+Course+1",
      courseName: "Introduction to Advanced Concepts",
      instructor: { firstName: "System", lastName: "Admin" },
      price: 1999,
      ratingAndReviews: [{rating: 5}, {rating: 4}]
    },
    {
      _id: "m2",
      thumbnail: "https://placehold.co/600x400/1F2937/FFFFFF?text=Upcoming+Course+2",
      courseName: "Mastering the Fundamentals",
      instructor: { firstName: "Jane", lastName: "Doe" },
      price: 1499,
      ratingAndReviews: [{rating: 4}]
    },
    {
      _id: "m3",
      thumbnail: "https://placehold.co/600x400/1F2937/FFFFFF?text=Upcoming+Course+3",
      courseName: "Professional Development Suite",
      instructor: { firstName: "Alice", lastName: "Brown" },
      price: 2499,
      ratingAndReviews: [{rating: 5}, {rating: 5}]
    },
    {
      _id: "m4",
      thumbnail: "https://placehold.co/600x400/1F2937/FFFFFF?text=Upcoming+Course+4",
      courseName: "Zero to Hero Masterclass",
      instructor: { firstName: "John", lastName: "Smith" },
      price: 999,
      ratingAndReviews: [{rating: 4}, {rating: 4}]
    }
  ];

  return (
    <>
      {Courses?.length ? (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={true}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {Courses?.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Swiper
          slidesPerView={1}
          spaceBetween={25}
          loop={false}
          modules={[FreeMode, Pagination]}
          breakpoints={{
            1024: {
              slidesPerView: 3,
            },
          }}
          className="max-h-[30rem]"
        >
          {dummyCourses.map((course, i) => (
            <SwiperSlide key={i}>
              <Course_Card course={course} Height={"h-[250px]"} />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </>
  )
}

export default CourseSlider
