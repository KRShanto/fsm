import { cn } from "@/lib/cn";
import { FaQuoteLeft, FaStar, FaStarHalf } from "react-icons/fa";

const testimonials = [
  {
    name: "Fahim Ahmed",
    star: 5,
    description:
      "I am very happy with the service provided by Fire and Safety Management. They are very professional and always deliver on time. I highly recommend them to anyone looking for safety and fire management solutions.",
  },
  {
    name: "KR Shanto",
    star: 4,
    description:
      "I am very happy with the service provided by Fire and Safety Management. They are very professional and always deliver on time. I highly recommend them to anyone looking for safety and fire management solutions.",
  },
  {
    name: "Aamir MZ",
    star: 2.5,
    description:
      "I am very happy with the service provided by Fire and Safety Management. They are very professional and always deliver on time. I highly recommend them to anyone looking for safety and fire management solutions.",
  },
];

export default function AboutTestimonial() {
  return (
    <div className="relative mx-auto flex max-w-7xl flex-col items-center bg-[#F9F6EE] p-20 pb-40">
      {/* <h2 className="stroke absolute right-10 top-[60%] z-10 origin-right -translate-y-1/2 rotate-[90deg] transform text-7xl font-bold uppercase">
        Testimonial
      </h2> */}

      <h2 className="font-montserrat text-4xl font-bold">
        FSM <span className="text-[#ED1C24]">Clients Thoughts</span>
      </h2>

      <p className="mt-5">
        Take a look at what our clients have to say about us and learn how we've
        helped them enhance their safety and security.
      </p>

      <div className="relative mt-5 grid w-[100rem] max-w-[1200px] grid-cols-3 gap-10 -left-8">
        {testimonials.map((testimonial, i) => (
          <div
            key={i}
            className="relative flex flex-col items-center gap-4 bg-white p-8 pb-20"
            style={{
              background:
                i % 2 === 0
                  ? "linear-gradient(96deg, #ED1C24 0.01%, #9E1C1C 78.5%)"
                  : "white",
              boxShadow: "4px 4px 4px 2px rgba(0, 0, 0, 0.10)",
            }}
          >
            <FaQuoteLeft
              size={50}
              className={cn(i % 2 === 0 ? "text-white" : "text-primary")}
            />
            <p
              className={cn(
                "text-center",
                i % 2 === 0 ? "text-white" : "text-black",
              )}
            >
              {testimonial.description}
            </p>
            <div className="flex gap-3">
              {[...Array(5)].map((_, i) =>
                i + 1 <= testimonial.star ? (
                  <FaStar key={i} className="text-xl text-yellow-500" />
                ) : i + 0.5 === testimonial.star ? (
                  <div className="relative">
                    <FaStarHalf key={i} className="text-xl text-yellow-500" />
                    <FaStar
                      key={i}
                      className="absolute left-0 top-0 text-xl text-yellow-500 opacity-35"
                    />
                  </div>
                ) : (
                  <FaStar
                    key={i}
                    className="text-xl text-yellow-500 opacity-35"
                  />
                ),
              )}
            </div>

            <div className="absolute -bottom-16 flex flex-col items-center">
              <div className="h-20 w-20 rounded-full bg-[#615556]"></div>
              <h3 className="text-xl font-bold">{testimonial.name}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
