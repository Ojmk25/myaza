import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import { useSessionStorage } from "@/hooks/useStorage";
import { IsAuthenticated, } from "@/services/authService";
import Head from "next/head";
import TermsNav from "@/components/TermsNav";
import Link from "next/link"
const TermsofEngage = () => {
  const [expressJoin, setExpressJoin] = useSessionStorage(
    "meetingJoiner",
    "yes"
  );
  const [loggedIn, setLoggedIn] = useState<boolean | null>(null);

  const onboarding = React.useRef(null);
  const createSessionSection = React.useRef(null);
  const startingMeetingSection = React.useRef(null);
  const switchCameraSection = React.useRef(null);
  const actionSection = React.useRef(null);
  const respectSection = React.useRef(null);
  const emojiReactionSection = React.useRef(null);
  const suspendSection = React.useRef(null);
  const accessingAccountSection = React.useRef(null);
  const signInSection = React.useRef(null);
  const settleSection = React.useRef(null);
  const signUpDection = React.useRef(null);
  const termsSection = React.useRef(null);
  const usingEmojiSection = React.useRef(null);
  const recordMeetingSection = React.useRef(null);
  const serviceSection = React.useRef(null);
  const abuseSection = React.useRef(null);
  const profileEditSection = React.useRef(null);
  const updateProfileSection = React.useRef(null);
  const businessSection = React.useRef(null);
  const scrollDown = (ref: any) => {
    const offset = 106; // Adjust this value as needed
    const targetPosition =
      ref?.current.getBoundingClientRect().top + window.scrollY - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setLoggedIn(IsAuthenticated());
  }, []);
  return (
    <>
      <Head>
        <title>CecureStream Terms of Service        </title>
        <meta name="description" content="Web video conferencing tool" />
      </Head>
      {
        loggedIn !== null &&
        <>
          <div className="pt-4">
            <Header />
          </div>
          <div>
            <section className=" md:pb-[177px] px-2">
              <h1 className="text-center mt-12 font-bold text-xl lg:text-5xl text-[#080808]">Terms of Service</h1>
              <p className=" text-xl text-center my-4 leading-[26px] text-cs-purple-500 px-2 ">
                  Last Updated January, 2025
                </p>
                            <TermsNav/>
              
              <div className="container mx-auto md:flex">

                <div className="md:w-[30%] hidden lg:block pl-6">
                  <div className="sticky top-[15%]">
                    <div className="h-[400px] overflow-y-auto px-[10px] ">
                      <div className="mb-6  md:w-full text-cs-grey-700 text-base  font-normal">
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(onboarding)}
                          >
                            1{" "}
                            <span className="ml-[5px]">Age requirements</span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(signUpDection)}
                          >
                            2<span className="ml-[5px]">Our Services</span>
                          </div>

                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(signInSection)}
                          >
                            3{" "}
                            <span className="ml-[5px]">
                              What you can expect from us
                            </span>
                          </div>
                          <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(accessingAccountSection)}
                            >
                              <span className="ml-[5px]">
                               3.1 Develop, improve, and update our services
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(createSessionSection)}
                          >
                            4{" "}
                            <span className="ml-[5px]">
                              What we expect from you
                            </span>
                          </div>
                          <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(startingMeetingSection)}
                            >
                              <span className="ml-[5px]">4.1 Follow these terms

                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(respectSection)}
                            >
                              <span className="ml-[5px]">4.2 Respect others


                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(abuseSection)}
                            >
                              <span className="ml-[5px]">4.3 Don’t abuse our services
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(serviceSection)}
                          >
                            5 <span className="ml-[5px]">Service-related communications

                            </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(switchCameraSection)}
                          >
                            6 <span className="ml-[5px]">Software in CecureStream

                            </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(emojiReactionSection)}
                          >
                            7<span className="ml-[5px]">Warranty</span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(recordMeetingSection)}
                          >
                            8{" "}
                            <span className="ml-[5px]">
                              Disclaimers
                            </span>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(profileEditSection)}
                          >
                            9{" "}
                            <span className="ml-[5px]">
                              Liabilities
                            </span>
                          </div>
                          <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(updateProfileSection)}
                            >
                              <span className="ml-[5px]">9.1 For all users
                              </span>
                            </div>
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(businessSection)}
                            >
                              <span className="ml-[5px]">9.2 For business users and organizations only
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(actionSection)}
                          >
                            10{" "}
                            <span className="ml-[5px]">
                              Taking action in case of problems
                            </span>
                          </div>
                          <div className="ml-[24px] mt-[20px] flex gap-[20px] flex-col">
                            <div
                              className=" cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                              onClick={() => scrollDown(suspendSection)}
                            >
                              <span className="ml-[5px]">10.1 Suspending or terminating your access to CecureStream or other services

                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(settleSection)}
                          >
                            11{" "}
                            <span className="ml-[5px]">
                            Settling disputes, governing law, and courts                               </span>
                          </div>
                        
                        </div>  <div className="mb-[28px] ">
                          <div
                            className="cursor-pointer hover:text-cs-purple-500 hover:font-semibold"
                            onClick={() => scrollDown(termsSection)}
                          >
                            12{" "}
                            <span className="ml-[5px]">
                            About these terms                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="lg:w-[65%] w-full lg:ml-[79px]  lg:mt-0 mb-[60px] lg:mb-0 lg:mx-20">
                <div className="bg-gray-50">
              <section className="text-cs-grey-800">
                
              
                <p className="text-lg my-4 text-cs-grey-800 px-2 ">
                  We know it’s tempting to skip these Terms of Service, but it’s important to establish what you can expect from us as you use <span className="font-semibold text-[#333333] text-base">CecureStream</span> , and what we expect from you. Understanding these terms is important because,by accessing or using <span className="font-semibold text-[#333333] text-base">CecureStream</span> , you’re agreeing to these terms.     </p>
                <p className=" text-lg my-4 text-cs-grey-800  px-2 ">
                  Besides these terms, we also publish a <Link className="text-cs-purple-500 font-semibold" href="/privacy-policy">Privacy Policy.</Link>  Although it’s not part of these terms, we encourage you to read it to better understand how you can update, manage, export, and delete your information.                </p>
                <p className=" text-lg my-2 font-bold text-cs-grey-800 px-2 ">

                  Terms of Service
                </p>
                <p className=" text-lg my-2  text-cs-grey-800 mx-auto px-2 ">
                  Service provider:</p>
                <p className=" text-[18px]  text-cs-grey-800 mx-auto px-2 ">
                  CecureStream is provided by, and you’re contracting with:</p>
                <p className=" text-lg my-4 text-cs-grey-800 mx-auto px-2 ">
                  <span className="font-bold">Cecure Intelligence Limited </span> (‘CIL’ hereinafter) organized under the laws of Nigeria. Its address is 6 Esugbayi Street, Ikeja G.R.A., Lagos
                </p>
              </section>
            </div>
                  <div className="mt-[40px]">
                    <div className=" ">
                      <div>
                        <span
                          className="text-cs-grey-800 text-xl font-bold"
                          ref={onboarding}
                        >
                          1.<span className="ml-[5px] font-bold">Age requirements
                          </span>
                        </span>
                      </div>
                    </div>
                    <div className="mt-[15px] ml-6">
                      <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        If you’re under the age of thirteen (13) or under the                         <a className="text-cs-purple-500" href="https://support.google.com/accounts/answer/1350409" target="_blank" rel="noopener noreferrer">age required to manage your own Google Account,</a>
                        you must have your parent or legal guardian’s permission to use CecureStream. Please have your parent or legal guardian read these terms with you.
                      </p>
                      <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        If you’re a parent or legal guardian, and you allow your child to use CecureStream, then these terms apply to you and you’re responsible for your child’s activity on CecureStream.    </p>
                      <p className="ml-[8px] mb-2  text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Your relationship with CIL

                      </p>
                      <p className="ml-[8px]  text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        These terms help define the relationship between you and CIL. When we speak of “CIL,” “we,” “us,” and “our,” we mean Cecure Intelligence Limited and its affiliates. Broadly speaking, we give you permission to access and use CecureStream if you agree to follow these terms.
                      </p>
                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={signUpDection}>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          2
                          <span className="ml-[5px]  font-bold">Our Services</span>
                        </span>
                      </div>

                    </div>

                    <div className="mt-[15px] ml-6">

                      <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">We offer diverse services - CecureStream being one among them. These Terms of Service apply to your use of CecureStream only. </p>
                
                    </div>


                  </div>

                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={signInSection}>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          3
                          <span className="ml-[5px]  font-bold">
                            What you can expect from us
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={accessingAccountSection}>
                        <p className="ml-[5px] font-semibold mb-4">3.1 Develop, improve, and update our services
                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">We’re constantly developing new technologies and features to improve our services. As part of this continual improvement, we sometimes add or remove features and functionalities, increase or decrease limits to our services, and start offering new services or stop offering old ones. When a service requires or includes downloadable or preloaded software, that software sometimes updates automatically on your device once a new version or feature is available. Some services let you adjust your automatic update settings. </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">If we make material changes that negatively impact your use of our services or if we stop offering a service, we’ll provide you with reasonable advance notice, except in urgent situations such as preventing abuse, responding to legal requirements, or addressing security and operability issues.</p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" ">
                      <div ref={createSessionSection}>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          4
                          <span className="ml-[5px] ">
                            What we expect from you
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={startingMeetingSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                          4.1 Follow these terms
                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                          The permission we give you to access and use our services continues as long as you comply with these terms.</p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                          We also make various policies, help centers, and other resources available to you to answer common questions and to set expectations about using our services. These resources include our Privacy Policy , Acceptable Use Policy. Finally, we may provide specific instructions and warnings within our services – such as dialog boxes that alert you to important information.
                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                          Although we give you permission to use our services, we retain any intellectual property rights we have in the services.  </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={respectSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                         4.2 Respect others                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                          We want to maintain a respectful environment for everyone, which means you must follow these basic rules of conduct:</p>
                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5 ">comply with applicable laws, including export control, sanctions, and human trafficking laws

                          </li>
                          <li className="mb-3 list-disc leading-5">respect the rights of others, including privacy and intellectual property rights

                          </li>
                          <li className=" list-disc leading-5 mb-3">don’t abuse or harm others or yourself (or threaten or encourage such abuse or harm) — for example, by misleading, defrauding, illegally impersonating, defaming, bullying, harassing, or stalking others
                          </li>
                        </ul>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota ">
                           <Link className="text-cs-purple-500 font-semibold" href="/acceptance-policy">Our Acceptable Use Policy </Link>  provides additional details about appropriate conduct that everyone using our services must follow. If you find that others aren’t following these rules, our services allow you to report abuse.   </p>

                      </div>
                      <div className="mt-[15px] ml-6" ref={abuseSection}>
                        <p className="ml-[5px] font-semibold mb-4">
                         4.3 Don’t abuse our services                 </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                          Most people who access or use our services understand the general rules that keep the internet safe and open. Unfortunately, a small number of people don’t respect those rules, so we’re describing them here to protect our services and users from abuse. In that spirit:</p>
                        < p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                          You must not abuse, harm, interfere with, or disrupt our services or systems — for example, by:
                        </p>

                        <ul className="pl-[5px] lg:pl-[44px] mb-4">
                          <li className="mb-3 list-disc leading-5">introducing malware
                          </li>
                          <li className="mb-3 list-disc leading-5">spamming, hacking, or bypassing our systems or protective measures

                          </li>
                          <li className="mb-3 list-disc leading-5">jailbreaking, adversarial prompting, or prompt injection

                          </li>
                          <li className=" list-disc">accessing or using our services or content in fraudulent or deceptive ways, such as:

                            <ul className="pl-[5px] lg:pl-[44px] mb-4">
                              <li className=" list-disc leading-5 my-3">phishing</li>
                              <li className=" list-disc leading-5 mb-3">creating fake accounts or content, including fake reviews</li>
                              <li className=" list-disc leading-5 mb-3">misleading others into thinking that generative AI content was created by a human</li>
                              <li className=" list-disc leading-5 ">providing services that appear to originate from you (or someone else) when they actually originate from us
                              </li>

                            </ul>
                          </li>
                          <li className=" list-disc leading-5 mb-3">providing services that appear to originate from us when they do not

                          </li>      <li className=" list-disc leading-5 mb-3">using our services (including the content they provide) to violate anyone’s legal rights, such as intellectual property or privacy rights


                          </li>      <li className=" list-disc leading-5 mb-3">reverse engineering our services or underlying technology, such as our machine learning models, to extract trade secrets or other proprietary information, except as allowed by applicable law


                          </li>      <li className=" list-disc leading-5 mb-3">using automated means to access content from any of our services in violation of the machine-readable instructions on our web pages (for example, robots.txt files that disallow crawling, training, or other activities)


                          </li>      <li className=" list-disc leading-5 mb-3">using AI-generated content from our services to develop machine learning models or related AI technology


                          </li>      <li className=" list-disc leading-5 mb-3">hiding or misrepresenting who you are in order to violate these terms


                          </li>      <li className=" list-disc leading-5 mb-3">providing services that encourage others to violate these terms


                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={serviceSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl  font-bold">
                          5
                          <span className="ml-[5px]  font-bold">Service-related communications</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6">
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        To provide you with our services, we sometimes send you service announcements and other information. To learn more about how we communicate with you, see  <Link className="text-cs-purple-500 font-semibold" href="/privacy-policy">our Privacy Policy</Link>                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        If you choose to give us feedback, such as suggestions to improve our services, we may act on your feedback without obligation to you. </p>
                     
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={switchCameraSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl  font-bold">
                          6
                          <span className="ml-[5px]  font-bold">Software in CecureStream
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6">
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        CecureStream is downloadable. We give you permission to use that software as part of our services.      </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        The license we give you is:
                        </p>
                        <ul className="pl-[12px] lg:pl-[44px] mb-4">
                              <li className=" list-disc leading-5 my-3">worldwide, which means it’s valid anywhere in the world
                              </li>
                              <li className=" list-disc leading-5 mb-3">non-exclusive, which means that we can license the software to others
                              </li>
                              <li className=" list-disc leading-5 mb-3">personal, which means it doesn’t extend to anyone else
                              </li>
                              <li className=" list-disc leading-5 ">non-assignable, which means you’re not allowed to assign the license to anyone else except where expressly permitted by us

                              </li>

                        </ul>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        You may not copy, modify, distribute, sell, or lease any part of our services or software.                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        In case of problems or disagreements
                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Both the law and these terms give you the right to (1) a certain quality of service, and (2) ways to fix problems if things go wrong.                        </p>
                     
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={emojiReactionSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          7
                          <span className="ml-[5px]  font-bold">Warranty</span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={usingEmojiSection}>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        We provide our services using reasonable skill and care. If we don’t meet the quality level described in this warranty, you agree to tell us and we’ll work with you to try to resolve the issue.
                       </p>
                      
                      </div>

                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" " ref={recordMeetingSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          8
                          <span className="ml-[5px]  font-bold">
                          Disclaimers
                          </span>
                        </span>
                      </div>
                <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">The only commitments we make about our services (including the content in the services, the specific functions of our services, or their reliability, availability, or ability to meet your needs) are provided in (1) the Warranty section; and (2) laws that can’t be limited by these terms.</p>
                    </div>
                  </div>

                  <div className="mt-[40px]">
                    <div className=" " ref={profileEditSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          9
                          <span className="ml-[5px]">
                          Liabilities{" "}
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={updateProfileSection}>
                        <p className="text-cs-grey-800 ml-[5px] mb-4 text-base font-semibold font-lotar leading-relaxed">
                       9.1  For all users
                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Both the law and these terms try to strike a balance as to what you or CIL can claim from the other in case of problems. That’s why the law requires everyone to be responsible for certain liabilities — but not others — under these terms.

                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        These terms only limit our responsibilities as allowed by applicable law. These terms don’t limit liability for:

                        </p>
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc">fraud or fraudulent misrepresentation

                          </li>
                          <li className="mb-3 list-disc">death or personal injury caused by negligence
                          </li>
                          <li className="mb-3 list-disc">
                          gross negligence
                          </li>
                          <li className="mb-2 list-disc">willful misconduct
                          </li>
                        </ul>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Other than the liabilities described above, CIL is liable only for its breaches of these terms subject to applicable law.
                        </p>
                      </div>
                      <div className="mt-[15px] ml-6" ref={businessSection}>
                        <p className="text-cs-grey-800 ml-[5px] mb-4 text-base font-semibold font-lotar leading-relaxed">
                        9.2 For business users and organizations only                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Both the law and these terms try to strike a balance as to what you or CIL can claim from the other in case of problems. That’s why the law requires everyone to be responsible for certain liabilities — but not others — under these terms.

                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        If you’re a business user or organization:

                        </p>
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc leading-6">To the extent allowed by applicable law, you’ll indemnify CIL and its directors, officers, employees, and contractors for any third-party legal proceedings (including actions by government authorities) arising out of or relating to your unlawful use of the services or violation of these terms. This indemnity covers any liability or expense arising from claims, losses, damages, judgments, fines, litigation costs, and legal fees, except to the extent a liability or expense is caused by CIL’s breach, negligence, or willful misconduct.

                          </li>
                          <li className="mb-3 list-disc leading-6">If you’re legally exempt from certain responsibilities, including indemnification, then those responsibilities don’t apply to you under these terms. For example, the United Nations enjoys certain immunities from legal obligations and these terms don’t override those immunities.

                          </li>
                          <li className="mb-3 list-disc leading-5">
                            CIL won’t be responsible for the following liabilities:
                            <ul className="my-2 pl-5">
                          <li className="mb-3 list-disc leading-5">loss of profits, revenues, business opportunities, goodwill, or anticipated savings
                          </li>
                          <li className="mb-3 list-disc leading-5">indirect or consequential loss
                          </li>
                          <li className="mb-3 list-disc leading-5">punitive damages

                          </li>
                        
                        </ul>
                          </li>
                          <li className="mb-2 list-disc leading-5">CIL’s total liability arising out of or relating to these terms is limited to the greater of (1) US$500 or (2) 125% of the fees that you paid to use the relevant services in the 12 months before the breach.
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={actionSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          10
                          <span className="ml-[5px]">
                          Taking action in case of problems
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={actionSection}>
                      
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Before taking action as described below, we’ll provide you with advance notice when reasonably possible, describe the reason for our action, and give you an opportunity to clarify the issue and address it, unless we reasonably believe that doing so would:
                        </p>
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc">cause harm or liability to a user, third party, or CIL

                          </li>
                          <li className="mb-3 list-disc">violate the law or a legal enforcement authority’s order
                          </li>
                          <li className="mb-3 list-disc">
                          compromise an investigation
                          </li>
                          <li className="mb-2 list-disc">compromise the operation, integrity, or security of our services
                          </li>
                        </ul>
                        
                      </div>
                      <div className="mt-[15px] ml-6" ref={suspendSection}>
                        <p className="text-cs-grey-800 ml-[5px] mb-4 text-base font-semibold font-lotar leading-relaxed">
                       10.1  Suspending or terminating your access to CecureStream or other services</p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Without limiting any of our other rights, CIL may suspend or terminate your access to the services or delete your account if any of these things happen:

                        </p>                   
                        <ul className="mb-2 pl-5 lg:pl-[44px]">
                          <li className="mb-3 list-disc leading-5">you materially or repeatedly breach these terms, or Acceptable Use Policy
                          </li>
                          <li className="mb-3 list-disc leading-6">we’re required to do so to comply with a legal requirement or a court order

                          </li>
                          <li className="mb-3 list-disc leading-5">
                          we reasonably believe that your conduct causes harm or liability to a user, third party, or CIL — for example, by hacking, phishing, harassing, spamming, misleading others, or scraping content that doesn’t belong to you
                          </li>
                        </ul>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Of course, you’re always free to stop using our services at any time. If you do stop using a service, we’d appreciate knowing why so that we can continue improving our services.
                        </p> 
                      </div>
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={settleSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          11
                          <span className="ml-[5px] ">
                          Settling disputes, governing law, and courts                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={settleSection}>
                      
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        Nigerian Law generally will govern these terms and disputes will be settled in the Nigerian court with requisite jurisdiction.                        </p>                    
                      </div>
                    
                    </div>
                  </div>
                  <div className="mt-[40px]">
                    <div className=" " ref={termsSection}>
                      <div>
                        <span className="text-cs-grey-800 text-xl font-bold">
                          12
                          <span className="ml-[5px] ">
                          About these terms
                          </span>
                        </span>
                      </div>
                      <div className="mt-[15px] ml-6" ref={termsSection}>
                      
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        By law, you have certain rights that can’t be limited by a contract like these terms of service. These terms are in no way intended to restrict those rights. 
                        </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        These terms describe the relationship between you and CIL while you are using CecureStream and other CIL’s services where your use of those services is governed by these terms. They don’t create any legal rights for other people or organizations, even if others benefit from that relationship under these terms. </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                          If it turns out that a particular term is not valid or enforceable, this will not affect any other terms.</p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        If you don’t follow these terms and we don’t take action right away, that doesn’t mean we’re giving up any rights that we may have, such as taking action in the future. </p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        We may update these terms (1) to reflect changes in our services or how we do business — for example, when we add new services, features, technologies, pricing, or benefits (or remove old ones), (2) for legal, regulatory, or security reasons, or (3) to prevent abuse or harm.</p>
                        <p className="ml-[8px] mb-2 text-cs-grey-800 text-base font-light font-lota leading-relaxed">
                        If we materially change these terms, we’ll provide you with reasonable advance notice and the opportunity to review the changes, except (1) when we launch a new service or feature, or (2) in urgent situations, such as preventing ongoing abuse or responding to legal requirements. If you don’t agree to the new terms, you should stop using the services. You can also end your relationship with us at any time.</p>
                     
                      </div>
                    
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      }
    </>
  );
}
export default TermsofEngage