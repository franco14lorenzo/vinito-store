import { ClipboardList, Truck, Wine } from 'lucide-react'

import { Feature } from '@/app/components/home/feature'

const Features = () => {
  return (
    <section className="my-12 mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
      <Feature
        icon={<Wine className="size-8" />}
        title="Selected wines"
        description="We offer three exclusive wine tasting packages—Standard, Premium, and Deluxe—each designed to provide a unique journey through the world of wine. Our Standard Tasting is perfect for newcomers, featuring a delightful selection of three wines. The Premium Tasting elevates your experience with four exceptional wines, ideal for expanding your wine knowledge. For the ultimate indulgence, our Deluxe Tasting includes five of the finest wines, perfect for connoisseurs and special occasions. Discover the art of wine tasting with our meticulously curated packages and embark on new adventures in every glass. Cheers!"
      />
      <Feature
        icon={<ClipboardList className="size-8" />}
        title="Unique experience"
        description="Our tasting experience goes beyond just the wines. Each package is delivered in elegant packaging and includes a selection of handpicked wines tailored to your chosen tasting level—Standard, Premium, or Deluxe. You'll also receive a comprehensive tasting guide with expert insights, tasting notes, and pairing suggestions. To enhance your enjoyment, we include essential wine accessories such as a corkscrew, wine stoppers, and drip rings. Occasionally, you might find special surprises like exclusive wine samples or gourmet snacks. Every detail is meticulously curated to provide you with a memorable and enriching wine tasting journey."
      />
      <Feature
        icon={<Truck className="size-8" />}
        title="Direct delivery"
        description="Our exclusive direct delivery service for guests ensures a seamless and convenient wine tasting experience. We offer flexible scheduling and deliver directly to your accommodation, providing personalized service and local expertise to guarantee timely and careful delivery. For added luxury, we include a complimentary tasting setup to create the perfect environment right in your Airbnb. Enjoy the finest wines with ease and elevate your stay with our specialized delivery service."
      />
    </section>
  )
}

export default Features
