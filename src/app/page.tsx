import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
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
     < div className='mx-auto mb-20 mt-32 max-w-5xl sm:mt-20'>
        <div className='mb-12 px-6 lg:px-8'>
          <div className='mx-auto max-w-2xl sm:text-center'>
            <h2 className='mt-2 font-bold text-4xl text-gray-900 sm:text-5xl'>
              Start your Preparation in minutes
            </h2>
            <p className='mt-4 text-lg text-gray-600'>
            Preparation  has never been easier than with Easy Study.
            </p>
          </div>
        </div>
        </div>

       {/* Steps */}
       <ol className="my-12 space-y-8 pt-8 md:flex md:space-x-8 md:space-y-0">
  {[
    {
      step: "Step 1",
      title: "Sign up for an account",
      description:
        "Either start with a free plan or choose our ",
      linkText: "pro plan",
      linkHref: "/pricing",
    },
    {
      step: "Step 2",
      title: "Choose your Type of prepration and difficulty level",
      description:
        "We'll process your Topic and make it ready for you to Learn with various Components.",
    },
    {
      step: "Step 3",
      title: "Start Your Preparation",
      description:
        "It's that simple. Try out Easy Study today - it really takes less than a minute.",
    },
  ].map((item, index) => (
    <li key={index} className="md:flex-1 flex">
      <div className="flex flex-col h-full items-start space-y-4 rounded-lg border border-zinc-200 bg-white p-6 shadow-md hover:shadow-lg transition-shadow md:items-center md:text-center">
        <span className="text-lg font-medium text-blue-600">{item.step}</span>
        <span className="text-2xl font-semibold text-zinc-800">{item.title}</span>
        <span className="mt-2 text-lg text-zinc-600">
          {item.description}
          {item.linkText && (
            <Link
              href={item.linkHref}
              className="text-blue-700 underline underline-offset-2 ml-1">
              {item.linkText}
            </Link>
          )}
        </span>
      </div>
    </li>
  ))}
</ol>
    <Footer/>

    </>
  );
}
