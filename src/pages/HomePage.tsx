import { Hero } from '../components/Hero'
import { HomeAutomation } from '../components/home/HomeAutomation'
import { HomeCapabilities } from '../components/home/HomeCapabilities'
import { HomeCta } from '../components/home/HomeCta'
import { HomeManifesto } from '../components/home/HomeManifesto'
import { HomePrint } from '../components/home/HomePrint'
import { HomeProcess } from '../components/home/HomeProcess'
import { HomeSoftware } from '../components/home/HomeSoftware'
import { HomePromise } from '../components/home/HomePromise'
import { HomeValueProps } from '../components/home/HomeValueProps'
import { HomeReferenzen } from '../components/home/HomeReferenzen'
import { HomeBlog } from '../components/home/HomeBlog'
import { HomeWebsites } from '../components/home/HomeWebsites'

export function HomePage() {
  return (
    <>
      <Hero />
      <HomeSoftware />
      <HomeAutomation />
      <HomeWebsites />
      <HomeReferenzen />
      <HomeBlog />
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
