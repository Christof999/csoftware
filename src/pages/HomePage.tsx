import { Hero } from '../components/Hero'
import { HomeCapabilities } from '../components/home/HomeCapabilities'
import { HomeCta } from '../components/home/HomeCta'
import { HomeManifesto } from '../components/home/HomeManifesto'
import { HomeProcess } from '../components/home/HomeProcess'
import { HomePromise } from '../components/home/HomePromise'
import { HomeTrust } from '../components/home/HomeTrust'
import { HomeValueProps } from '../components/home/HomeValueProps'

export function HomePage() {
  return (
    <>
      <Hero />
      <HomeValueProps />
      <HomePromise />
      <HomeManifesto />
      <HomeProcess />
      <HomeTrust />
      <HomeCapabilities />
      <HomeCta />
    </>
  )
}
