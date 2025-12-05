import Link from 'next/link';
import { ArrowRight, UserPlus, Settings, BookOpen } from 'lucide-react';
import { buttonVariants } from '@/components/ui/button';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default function Home() {
  return (
    <>
    <Header/>
      <div className="mb-12 mt-12 sm:mt-12 flex flex-col items-center justify-center text-center">
        <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
          <p className="text-sm font-semibold text-gray-700">
            Easy Study is Live!
          </p>
        </div>
        <h1 className="max-w-4xl text-5xl font-bold md:text-6xl lg:text-7xl">
          Boost Your Preparation with <span className="text-blue-600">Easy Study</span> in seconds.
        </h1>
        <p className="mt-5 max-w-prose text-zinc-700 sm:text-lg">
        Easy Study simplifies your journey with expert-designed tools for exams, interviews, and coding Preparation.
        </p>

        <Link
          className={buttonVariants({
            size: 'lg',
            className: 'mt-5',
          })}
          href="/dashboard"
          target="_blank"
        >
          Get started <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </div>

      {/* Value proposition section */}
      <div>
        <div className="relative isolate">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          >
            <div
              style={{
                clipPath:
                  'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
              }}
              className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
            />
          </div>

          <div>
            <div className="mx-auto max-w-6xl px-6 lg:px-8">
              <div className="mt-16 flow-root sm:mt-24">
                <div className="-m-2 rounded-xl bg-gray-900/5 p-2 ring-1 ring-inset ring-gray-900/10 lg:-m-4 lg:rounded-2xl lg:p-4">
                  <Image
                    src="/prepartion.png"
                    alt="product preview"
                    width={1364}
                    height={866}
                    quality={100}
                    className="rounded-md bg-white p-2 sm:p-8 md:p-20 shadow-2xl ring-1 ring-gray-900/10"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     <div className='mx-auto mb-20 mt-32 max-w-7xl sm:mt-20 px-6 lg:px-8'>
        <div className='mb-16'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Start your Preparation in minutes
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
            Preparation  has never been easier than with Easy Study.
            </p>
          </div>
        </div>

       {/* Steps */}
       <div className="relative">
         {/* Connection line for desktop */}
         <div className="hidden md:block absolute top-24 left-0 right-0 h-0.5 bg-gradient-to-r from-blue-200 via-purple-200 to-blue-200"></div>
         
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
  {[
    {
      step: "01",
      title: "Sign up for an account",
      description:
        "Either start with a free plan or choose our pro plan to unlock advanced features and unlimited access to study materials.",
      icon: UserPlus,
      color: "blue",
    },
    {
      step: "02",
      title: "Choose your Type of preparation and difficulty level",
      description:
        "We'll process your Topic and make it ready for you to Learn with various Components tailored to your needs.",
      icon: Settings,
      color: "purple",
    },
    {
      step: "03",
      title: "Start Your Preparation",
      description:
        "It's that simple. Try out Easy Study today  it really takes less than a minute to get started with your personalized study materials.",
      icon: BookOpen,
      color: "blue",
    },
  ].map((item, index) => {
    const Icon = item.icon;
    const colorClasses = {
      blue: "bg-blue-500 text-blue-50 border-blue-200",
      purple: "bg-purple-500 text-purple-50 border-purple-200",
    };
    return (
      <div key={index} className="relative group">
        {/* Step number badge */}
        <div className={`absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-16 rounded-full ${colorClasses[item.color as keyof typeof colorClasses]} border-4 border-white shadow-lg flex items-center justify-center text-xl font-bold z-10`}>
          {item.step}
        </div>
        
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 pt-12 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
          {/* Icon */}
          <div className={`mb-6 w-16 h-16 rounded-xl ${item.color === 'blue' ? 'bg-blue-50' : 'bg-purple-50'} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
            <Icon className={`w-8 h-8 ${item.color === 'blue' ? 'text-blue-600' : 'text-purple-600'}`} strokeWidth={2} />
          </div>
          
          {/* Title */}
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            {item.title}
          </h3>
          
          {/* Description */}
          <p className="text-gray-600 leading-relaxed">
            {item.description}
          </p>
        </div>
      </div>
    );
  })}
</div>
</div>
</div>
    <Footer/>

    </>
  );
}
