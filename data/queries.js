/* "caseStudies": *[_id=="pageWork"][0]
  { 
  work[]->{slug, title, hero{asset->}, client->{name}, product,  problem, solution, deliverables, projectImages[]{title, caption, asset->}},
  }, */
export const homeQuery = /* groq */ `{
  "home": *[_type=="homepage"][0]{
  "hero": {
    heroVideo, heroPoster, mainHeadline
    },
  "intro": {
    introTheme, intro, introCta{title, external, url, "slug": route->slug.current}   
  },
  "about": {
   aboutTheme, aboutHeadline, aboutImages, aboutStats[]
  },
  "whyCirca": {
    whyLabel, whySections[]{title, text}, whyCta{title, external, url, "slug": route->slug.current} 
  },
  "work": {
    workTheme, workLabel, workHeadline, workImage, workBody, workCta{title, external, url, "slug": route->slug.current} 
  },
  "whatWeDo": {
    whatWeDoTheme, whatWeDoLabel, whatWeDoHeadline, whatWeDoBody, whatWeDoImage, whatWeDoCta{title, external, url, "slug": route->slug.current}
  },
  "partnerships": {
    partnershipsTheme, partnershipsLabel, partnershipsText, partnershipsCta{title, external, url, "slug": route->slug.current}
  },
  "meetTheTeam": {
    teamTheme, teamLabel, teamText, teamCta{title, external, url, "slug": route->slug.current}, teamImage
  }
  }
}`;

export const workQuery = /* groq */ `
*[_id=="pageWork"][0]{ 
  theme, title, heroHeadline, introLabel, introBody,
  workLabel, work[]->{slug, client->{name}, product, title, hero},
  metadata{title, description, "slug": slug->slug.current}
}`;

export const whatWeDoQuery = /* groq */ `
{
  "pageContent": *[_id=="pageWhatWeDo"][0]{ 
  theme, title, heroHeadline, introSubhead, introBody,
  servicesLabel, servicesList[]{title, icon, text}, servicesCta, servicesCtaBtn{title, "slug": route->slug.current},
  clientsCta{title, "slug": route->slug.current},
  clientsLabel,clientList[]->{name, website, logo, logoWhite}, philanthropyLabel, philanthropyIntro, philanthropyList[],
  metadata{title, description, "slug": slug->slug.current}
  }
}`;

export const clientsQuery = /* groq */ `
{
  "pageContent":  *[_id=="pageClients"][0]{ 
  theme, title, heroHeadline, introLabel, introSubhead, introBody, clientList[]->{name, website, logo, logoWhite},
  ctaHeadline, ctaBtn{title, external, url, "slug": route->slug.current},
  metadata{title, description, "slug": slug->slug.current}
  }
}`;

export const teamQuery = /* groq */ `
*[_id=="pageTeam"][0]{ 
  theme, title, heroHeadline, introLabel, introSubhead, introBody,
  teamMembers[]->{name, qualifications, jobTitle, linkedin, image}, ctaHeadline, ctaBtn{title, external, url, "slug": route->slug.current},
  metadata{title, description, "slug": slug->slug.current}
}`;

export const partnershipsQuery = /* groq */ `
*[_id=="pagePartnerships"][0]{ 
  theme, title, heroHeadline, introLabel, introBody,
  partnerLabel, partners[]{name, href, logo, text}, partnershipSummary,
  metadata{title, description, "slug": slug->slug.current}
}`;

export const joinUsQuery = /* groq */ `
*[_id=="pageJoinUs"][0]{ 
  theme, title, heroHeadline, introLabel, introBody,
  valuesLabel, valuesList[]{title, icon, text},vacanciesLabel,vacanciesIntro, jobVacancies[]->{title, location, "pdf": jobDescription.asset->url}, ctaText, ctaImage, ctaBtn{title, external, url, "slug": route->slug.current},
  metadata{title, description, "slug": slug->slug.current}
}`;

export const contactQuery = /* groq */ `
{
  "pageContent": *[_id=="pageContact"][0]{ 
  theme, title, heroHeadline, pageLabel, contactImage, introBody,
  metadata{title, description, "slug": slug->slug.current}
  },
  "contactDetails": *[_id=="global-config"][0]{
    contactDetails[]->{name, email, address, phone},
    socials
  }
}`;

export const legalQuery = /* groq */ `
{
  "pageContent":
    *[_id=="pageLegal"][0] {
      title, slug->{title, "current": slug.current}, text, metadata{title, description, "slug": slug->slug.current}
    },
    "theme": 
    *[_id=="pageContact"][0]{ 
      theme
      }
}`;

export const defaultThemeQuery = /* groq */ `
*[_id=="pageContact"][0]{ 
      theme
    }
`;
