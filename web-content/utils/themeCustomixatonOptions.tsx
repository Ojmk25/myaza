import Link from "next/link";
import {  FronteggThemeOptions,  } from "@frontegg/nextjs";


const themeOptions: FronteggThemeOptions = {
  loginBox: {
    boxStyle: {
      background: 'white',
    },
    logo: {
      placement: "box",
      alignment: "center",
      // image: cecureStreamSmall,
      style: {
        width: '100px',
        height: '100px',
        margin: '0 auto',
        display: 'none',
      },
    },
    pageHeader: () => {
      return ( 
        <h1 className=" text-2xl lg:text-3xl text-cs-purple-650 font-bold text-center metro-medium mb-6">
        <Link href="/">CecureStream</Link>
      </h1>
      )
    },
    socialLogins: {
      iconsOnly: false,
      buttonStyle: {
          base: {
            borderRadius: '10px',
            color: '#898989',
            background: '#fff',
            border: '1px solid #dfdfdf'
          },
          hover: { 
            background: '#fff',
          },
      },
      socialLoginsLayout: {
        mode: "eventually",
        placement: 'top', //place at the top of the login box
      },
      divider: () => {
        return (
          <div className="grid my-8 grid-cols-7 items-center">
            <div className=" h-[1px] bg-cs-grey-55 col-start-1 col-end-4"></div>
            <span className=" text-center text-cs-grey-400 text-sm">or with </span>
            <div className=" h-[1px] bg-cs-grey-55 col-start-5 col-end-8"></div>
          </div>
        )
      },
    },
    inputTheme: {
      base: {
        backgroundColor: '#fafafa',
        borderColor: '#fdfdfdf',
        borderRadius: '10px',
        borderWidth: '1px',
        borderStyle: 'solid',
      },
    },
    rootStyle: {
      // backgroundImage: cecureStream,
      // backgroundImage: `url(${userBg})`,
      // backgroundImage: `url("../public/assets/images/userBG.png")`,
      // backgroundSize: 'contain',
      // backgroundOrigin: 'border-box',
      // backgroundPosition: '25% 75%',
      // backgroundRepeat: 'no-repeat',
      backgroundColor: '#faf0ff'
    },
    login: {
      boxHeader: () => {
        return (
          <>
            <h3 className="text-center  text-2xl font-semibold text-cs-grey-dark mt-3 pb-7 metro-medium">
              Welcome back
            </h3>
          </>
        )
      },
      signupMessage: () => {
        return (
          <>  
            <p className="text-center text-cs-grey-100 text-sm">
              Login to your account with: 
            </p>
          </>
        )
      },
      pageFooter: () => {
        return (
            <div>
              <p className="mt-7 font-semibold metro-medium text-cs-grey-100 text-sm text-center"> Don’t have an account? 
                  <Link
                    href={"/account/sign-up"}
                    className="pl-3 text-cs-purple-500">
                    Sign Up
                  </Link> 
                </p>
            </div>
        )
      }
    },
    signup: {
      boxHeader: () => {
        return (
          <>
            <h3 className="text-center text-2xl font-semibold text-cs-grey-dark mt-3 pb-7 metro-medium">
              Sign up
            </h3>
          </>
        )
      },
      loginMessage: () => {
        return (
          <>  
            <p className="text-center text-cs-grey-100 text-sm">
              Create a new account with:
            </p>
          </>
        )
      },
      boxFooter: () => {
            return (
                <div className="mt-5 text-center text-xs leading-[18px]  text-cs-purple-400"> 
                    By proceeding, I agree to {' '}
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        className="font-medium text-cs-purple-500"
                        href={'/privacy-policy'}
                        >
                        Cecurestream's Privacy Statement
                    </a>{' '}
                    and{' '}
                    <a
                        target='_blank'
                        rel='noopener noreferrer'
                        className="font-medium text-cs-purple-500"
                        href={'/terms-of-service'}>
                        Terms of Service.
                    </a>
                </div>
            )
        },
      pageFooter: () => {
          return (
              <div>
                  <p className="mt-7 font-semibold metro-medium text-cs-grey-100 text-sm text-center">
                  Already have an account?
                  <Link
                    href={"/account/login"}
                    className="pl-3 text-cs-purple-500"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
          )
      }
    },
    forgotPassword: {
      boxHeader: () => {
        return (
          <>
            <h3 className="text-2xl font-semibold text-cs-grey-dark mt-3 mb-1 metro-medium">
              Forgot Password
            </h3>
          </>
        )
      },
      message: () => {
        return ( 
          <>  
            <p className=" text-cs-grey-100 text-sm mb-4">
              We are going to help you reset your password
            </p>
          </>
        )
      },
      // buttonTheme: {
      //   base: {
      //     backgroundColor: 'green',
      //     color: 'white',
      //     content: 'Reset Password',
      //   },
      // },
      submitButtonTheme: {
        base: {
          backgroundColor: '#5E29B7',
          content: 'Reset Password',
        }},
      backToLoginStyle: {
        color: '#5E29B7',
        textDecoration: 'none',
        fontWeight: 'bold',
      }
    },
    boxTitleStyle:{
      display: 'none',
    },  
  },
};

export { themeOptions };