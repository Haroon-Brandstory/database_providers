import { fetchAPI } from "./api";
import qs from 'qs'

// Fetch all categories
export async function getServiceCategories() {
    return fetchAPI("/service-categories?populate[sections][populate]=*");
}

// Fetch single category by slug
// export async function getCategoryBySlug(slug) {
//     return fetchAPI(`/service-categories?filters[slug][$eq]=${slug}&populate[sections][populate]=*`);
// }

export async function getCategoryBySlug(slug) {
    const query = qs.stringify({
        filters: {
            slug: { $eq: slug },
        },
        populate: {
            sections: {
                populate: true,
                on: {
                    // Banner (populate nested media + buttons)
                    "service-category.category-banner": {
                        populate: {
                            button: true,
                            currentCountryImg: true,
                            worldWideImg: true,
                        },
                    },

                    // Power-packed section
                    "service-category.power-packed-section": {
                        populate: {
                            powerButton: true,
                            VideoAKALottie: true,
                        },
                    },

                    // Powerpack infinity
                    "service-category.powerpack-infinity": {
                        populate: {
                            infSecContent: true,
                        },
                    },

                    // Video section
                    "service-category.video-section": {
                        populate: true,
                    },

                    // Country section (needs flag)
                    "service-category.country-section": {
                        populate: {
                            countryDetails: {
                                populate: "countryFlag",
                            },
                        },
                    },

                    // Industries covered (needs icon)
                    "service-category.industries-covered": {
                        populate: {
                            industriesCovered: {
                                populate: "icon",
                            },
                        },
                    },

                    // email format section 
                    "service-category.email-format-section": {
                        populate: "*",
                    },

                    // verification section 
                    "service-category.data-verification": {
                        populate: {
                            dataVerificationItem: {
                                populate: "verificationImage"
                            }
                        },
                    },

                    // instant access section
                    "service-category.instant-access": {
                        populate: {
                            button: true,
                        },
                    },

                    // roi section
                    "service-category.roi-section": {
                        populate: {
                            roiComponents: {
                                populate: "componentIcon"
                            },
                            button: true,
                        },
                    },

                    // business Expansion
                    "service-category.business-expansion": {
                        populate: "*"
                    },

                    // exclusive Email
                    "service-category.exclusive-email": {
                        populate: "*"
                    },

                    // faq Section
                    "service-category.faq-section": {
                        populate: "*"
                    },

                    // benefit Email Section
                    "service-category.benefit-email": {
                        populate: {
                            iconBox: {
                                populate: 'icon'
                            },
                        }
                    },

                    // clientForm Section
                    "service-category.client-form": {
                        populate: "*"
                    },

                    // clientForm Section
                    "service-category.email-open-rates": {
                        populate: "*"
                    },
                },
            },
            // service_under_categories: {
            //     populate: true,
            // },
        },
    }, { encodeValuesOnly: true });

    return fetchAPI(`/service-categories?${query}`);
}

export async function getServicesBySlug(slug) {
    const query = qs.stringify({
        filters: {
            slug: { $eq: slug },
            // service_category: {
            //     slug: { $eq: categorySlug }
            // }
        },
        populate: {
            components: {
                populate: true,
                on: {
                    // Banner (populate nested media + buttons)
                    "service-category.category-banner": {
                        populate: {
                            button: true,
                            currentCountryImg: true,
                            worldWideImg: true,
                        },
                    },

                    // Power-packed section
                    "service-category.power-packed-section": {
                        populate: {
                            powerButton: true,
                            VideoAKALottie: true,
                        },
                    },

                    // Powerpack infinity
                    "service-category.powerpack-infinity": {
                        populate: {
                            infSecContent: true,
                        },
                    },

                    // Video section
                    "service-category.video-section": {
                        populate: true,
                    },

                    // Country section (needs flag)
                    "service-category.country-section": {
                        populate: {
                            countryDetails: {
                                populate: "countryFlag",
                            },
                        },
                    },

                    // Industries covered (needs icon)
                    "service-category.industries-covered": {
                        populate: {
                            industriesCovered: {
                                populate: "icon",
                            },
                        },
                    },

                    // email format section 
                    "service-category.email-format-section": {
                        populate: "*",
                    },

                    // verification section 
                    "service-category.data-verification": {
                        populate: {
                            dataVerificationItem: {
                                populate: "verificationImage"
                            }
                        },
                    },

                    // instant access section
                    "service-category.instant-access": {
                        populate: {
                            button: true,
                        },
                    },

                    // roi section
                    "service-category.roi-section": {
                        populate: {
                            roiComponents: {
                                populate: "componentIcon"
                            },
                            button: true,
                        },
                    },

                    // business Expansion
                    "service-category.business-expansion": {
                        populate: "*"
                    },

                    // exclusive Email
                    "service-category.exclusive-email": {
                        populate: "*"
                    },

                    // faq Section
                    "service-category.faq-section": {
                        populate: "*"
                    },

                    // benefit Email Section
                    "service-category.benefit-email": {
                        populate: {
                            iconBox: {
                                populate: 'icon'
                            },
                        }
                    },

                    // clientForm Section
                    "service-category.client-form": {
                        populate: "*"
                    },

                    // clientForm Section
                    "service-category.email-open-rates": {
                        populate: "*"
                    },
                },
            },
        },
    }, { encodeValuesOnly: true });

    const res = await fetchAPI(`/service-under-categories?${query}`);
    return res || null;
}

export async function getAllBlogs() {
    return fetchAPI("/blog-posts?populate=*")
}

export async function getBlogBySlug(slug) {
    return fetchAPI(`/blog-posts?filters[BlogSlug][$eq]=${slug}&populate=*`);
}

// Fetch all services (can be paginated)
export async function getServices() {
    return fetchAPI("/service-pages?populate=*");
}

// Fetch services under a category
export async function getServicesByCategory(categorySlug) {
    return fetchAPI(`/service-pages?filters[category][slug][$eq]=${categorySlug}&populate=*`);
}

// Fetch single service page
export async function getAllCategoryBySlug(slug) {
    return fetchAPI(`/service-categories?filters[slug][$eq]=${slug}&populate[sections][populate]=*`);
}
