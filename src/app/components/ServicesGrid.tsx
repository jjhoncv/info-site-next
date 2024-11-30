import { Service } from "@/interfaces";
import Image from "next/image";
import Link from "next/link";

export default function ServicesGrid({ services }: { services: Service[] }) {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          {services.map((service, index) => (
            <Link href={`/services/${service.slug}`}>
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">
                  <div className="relative w-16 h-16">
                    <Image
                      src={service.image_url}
                      alt={service.title}
                      layout="fill"
                      className="text-blue-500"
                    />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
    // <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
    //   {services.map((service) => (
    //     <Link
    //       href={`/services/${service.id}`}
    //       key={service.id}
    //       className="block"
    //     >
    //       <div className="border p-4 rounded shadow bg-white hover:shadow-md transition-shadow">
    //         <h2 className="text-xl font-semibold">{service.title}</h2>
    //         <p className="text-gray-600">{service.subtitle}</p>
    //         <div className="relative w-full h-40 mt-2">
    //           <Image
    //             src={service.image_url}
    //             alt={service.title}
    //             layout="fill"
    //             objectFit="cover"
    //           />
    //         </div>
    //       </div>
    //     </Link>
    //   ))}
    // </div>
  );
}
