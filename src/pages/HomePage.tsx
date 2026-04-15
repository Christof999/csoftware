import { Hero } from '../components/Hero'
import { HomeCapabilities } from '../components/home/HomeCapabilities'
import { HomeCta } from '../components/home/HomeCta'
import { HomeManifesto } from '../components/home/HomeManifesto'
import { HomePrint } from '../components/home/HomePrint'
import { HomeProcess } from '../components/home/HomeProcess'
import { HomePromise } from '../components/home/HomePromise'
import { HomeValueProps } from '../components/home/HomeValueProps'
import { HomeWebsites } from '../components/home/HomeWebsites'

export function HomePage() {
  return (
    <>
      <Hero />
      <HomeWebsites />
      <HomeManifesto />
      <HomePrint />
      <HomeValueProps />
      <HomePromise />
      <HomeProcess />
      <HomeCapabilities />
      <HomeCta />
    </>
  )
}
