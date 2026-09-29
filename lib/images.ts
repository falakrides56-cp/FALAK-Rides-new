export const IMAGES = {
  logo: '/images/falak_ride_logo.png',
  heroKaaba: '/images/hero_transport.jpg',
  heroKaabaAlt: '/images/kaaba_night.jpg',
  kaabaPilgrims: '/images/kaaba_night.jpg',
  kaabaAerial: '/images/kaaba_night.jpg',
  kaabaPilgrims2: '/images/kaaba_night.jpg',
  madinahMosque: '/images/madinah_mosque.jpg',
  madinahMinarets: '/images/madinah_mosque.jpg',
  madinahDome: '/images/madinah_mosque.jpg',
  fleetShowcase: '/images/fleet_showcase.jpg',
  fleet: {
    sedan: 'https://images.pexels.com/photos/25691109/pexels-photo-25691109.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    suv: '/images/fleet_showcase.jpg',
    luxury: '/images/hero_transport.jpg',
    van: 'https://images.pexels.com/photos/39075475/pexels-photo-39075475.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    minibus: '/images/fleet_showcase.jpg',
  },
  routes: {
    'makkah-route': '/images/kaaba_night.jpg',
    'madinah-route': '/images/madinah_mosque.jpg',
    'madinah-airport': '/images/madinah_mosque.jpg',
    'taif-route': '/images/hero_transport.jpg',
    'riyadh-route': '/images/fleet_showcase.jpg',
    'dammam-route': '/images/hero_transport.jpg',
  },
  services: {
    'airport-transfer': '/images/service_airport_transfer_1790662933143.jpg',
    'umrah-ziyarat': '/images/service_umrah_ziyarat_1790662948310.jpg',
    'intercity-transfer': '/images/service_intercity_transfer_1790662965200.jpg',
    'city-tour': '/images/service_city_tour_1790662984439.jpg',
    'with-driver': '/images/service_with_driver_1790663003665.jpg',
    'self-drive': '/images/service_self_drive_1790663020210.jpg',
  },
};

export function getServiceImage(key: string): string {
  return IMAGES.services[key as keyof typeof IMAGES.services] || IMAGES.heroKaaba;
}

export function getFleetImage(key: string): string {
  return IMAGES.fleet[key as keyof typeof IMAGES.fleet] || IMAGES.fleet.sedan;
}

export function getRouteImage(key: string): string {
  return IMAGES.routes[key as keyof typeof IMAGES.routes] || IMAGES.heroKaaba;
}
