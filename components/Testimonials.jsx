import React from 'react';

const testimonials = [
  {
    id: 1,
    name: 'Deji Olamide',
    role: 'User',
    content:
      'This website has completely transformed the way i and my family shop without getting cheated by retailers. Highly recommended!',
    image: '/Frame 1000003208 (1).png',
  },
  {
    id: 2,
    name: 'Adamu Sani',
    role: 'User',
    content:
      'Excellent service and support. The team is always ready to help with any issues.',
    image: '/Frame 1000003208 (2).png',
  },
  {
    id: 3,
    name: 'Chioma Okon',
    role: 'User',
    content:
      'The best innovation i have seem this year. It has significantly improved my budget.',
    image: '/Frame 1000003208 (3).png',
  },
  {
    id: 4,
    name: 'Bob Brown',
    role: 'User',
    content:
      'best platform to track price of goods in nigeria hands down!!!',
    image: '/Frame 1000003208 (4).png',
  },
];

const Testimonials = () => {
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full mr-4"
                />
                <div>
                  <h3 className="text-lg font-semibold">{testimonial.name}</h3>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
              <p className="text-gray-700">{testimonial.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;