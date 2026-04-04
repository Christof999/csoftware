import { Hero } from '../components/Hero'
import { HomeCapabilities } from '../components/home/HomeCapabilities'
import { HomeCta } from '../components/home/HomeCta'
import { HomeManifesto } from '../components/home/HomeManifesto'
import { HomeMediaIdeas } from '../components/home/HomeMediaIdeas'
import { HomeProcess } from '../components/home/HomeProcess'
import { HomeProjectStrip } from '../components/home/HomeProjectStrip'
import { HomeTrust } from '../components/home/HomeTrust'
import { HomeValueProps } from '../components/home/HomeValueProps'

export function HomePage() {
  return (
    <>
      <Hero />
      <HomeProjectStrip />
      <HomeValueProps />
      <HomeManifesto />
      <HomeProcess />
      <HomeTrust />
      <HomeCapabilities />
      <HomeMediaIdeas />
      <HomeCta />
    </>
  )
}
