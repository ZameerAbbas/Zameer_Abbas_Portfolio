export interface ProjectGalleryImage {
  url: string
  caption?: string
}

export interface RelatedProject {
  slug: string
  title: string
  category: string
  image: string
}

export interface Project {
  id: number
  slug: string
  title: string
  category: string
  shortDescription: string
  description: string[]
  features: string[]
  technologies: string[]
  coverImage: string
  thumbnailImage: string
  gallery?: ProjectGalleryImage[]
  client?: string
  timeline: string
  role: string
  liveUrl?: string
  githubUrl?: string
  relatedProjects?: RelatedProject[]
}

const projects: Project[] = [
 
 
  
  {
    id: 1,
    slug: "bmc-medical-store",
    title: "BMC Medical Store",
    category: "E-Commerce Web Application",
    shortDescription:
      "A complete online medical store platform with a customer website, mobile app, and admin dashboard for managing products, orders, and pharmacy operations.",

    description: [
      "BMC Medical Store is a full-featured e-commerce platform developed for a medical store to bring its products and services online. The platform allows customers to browse medicines and healthcare products, explore categories, view product details, and place orders for delivery.",

      "The project includes a responsive web application and a dedicated mobile app designed to provide customers with a convenient shopping experience. Customers can search for products, add items to their cart, place orders, and track their purchases from their devices.",

      "A dedicated admin panel was also developed to manage the complete store operation from one place. Administrators can add, update, and remove products, manage product categories, monitor customer orders, update order statuses, and manage important store information.",

      "The platform was designed with a clean, user-friendly interface and responsive layouts so that customers can easily access the store from desktops, tablets, and mobile devices. The system helps BMC Medical Store manage its online presence while making medicine and healthcare product ordering more convenient for customers."
    ],

    features: [
      "Online browsing and purchasing of medicines and healthcare products",
      "Product categories and detailed product information",
      "Product search and filtering",
      "Shopping cart and checkout system",
      "Online order placement and order management",
      "Customer order history and order status tracking",
      "Admin dashboard for complete store management",
      "Add, edit, and delete products from the admin panel",
      "Product category management",
      "Order management and status updates",
      "Customer and store data management",
      "Responsive web application for desktop and mobile devices",
      "Dedicated mobile application for customers",
      "Branch and store information management"
    ],

    technologies: [
      "React",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Node.js",
      "REST API",
      "Database",
      "Admin Dashboard",
      "Mobile App",
      "Vercel"
    ],

    coverImage: "/bmc-medical-store-cover.png",

    thumbnailImage: "/bmc-medical-store-cover.png",

    gallery: [
      {
        url: "/bmc-medical-store-cover.png",
        caption: "BMC Medical Store Homepage"
      },
      {
        url: "/bmc-products.png",
        caption: "Products and Categories"
      },
      {
        url: "/bmc-product-details.png",
        caption: "Product Details"
      },
      {
        url: "/bmc-cart-checkout.png",
        caption: "Shopping Cart and Checkout"
      },
      {
        url: "/bmc-admin-dashboard.png",
        caption: "Admin Dashboard"
      },
      {
        url: "/bmc-order-management.png",
        caption: "Admin Order Management"
      },
      {
        url: "/bmc-mobile-app.png",
        caption: "BMC Medical Store Mobile App"
      }
    ],

    timeline: "4 months",

    role: "Full-Stack Developer & UI/UX Designer",

    liveUrl: "https://store-barcha-medicous.vercel.app/",

    githubUrl: "https://github.com/ZameerAbbas/store_barcha_medicous",

    relatedProjects: [
      {
        slug: "job-finder-app",
        title: "Job Finder App",
        category: "Mobile App",
        image: "/modern-finance-app.png",
      },
      {
        slug: "ecommerce-redesign",
        title: "E-Commerce Redesign",
        category: "E-Commerce",
        image: "/modern-apparel-storefront.png",
      },
    ],
  },

  


{
  id: 2,
  slug: "brinlgy-ecommerce-platform",
  title: "Brinlgy E-Commerce Platform",
  category: "E-Commerce & Mobile Application",

  shortDescription:
    "A complete multi-store eCommerce platform with a customer mobile app, centralized admin dashboard, and dedicated store owner dashboard for managing products, orders, stores, payments, and business operations.",

  description: [
    "Brinlgy is a complete multi-store eCommerce platform developed to connect customers, store owners, and administrators through one centralized digital ecosystem. The platform allows customers to browse products, explore different stores, add items to their cart, and place orders through the mobile application.",

    "The platform includes a dedicated Store Owner Dashboard that gives individual store owners complete control over their online stores. Store owners can manage their products, update product information, monitor inventory, receive and process customer orders, and track their store's performance from one place.",

    "A centralized Admin Dashboard was also developed to manage the overall Brinlgy platform. Administrators can manage users, stores, products, orders, transactions, payments, and other business operations. Role-based access allows different team members to access specific areas of the system according to their responsibilities.",

    "The Brinlgy mobile application provides customers with a simple and convenient shopping experience, while the web-based dashboards provide powerful management tools for administrators and store owners. The complete system was designed to create a scalable multi-vendor eCommerce environment where customers can shop from multiple stores and businesses can efficiently manage their online operations."
  ],

  features: [
    "Multi-store eCommerce platform",
    "Customer mobile application",
    "Centralized admin dashboard",
    "Dedicated store owner dashboard",
    "Store registration and management",
    "Product creation, editing, and management",
    "Product categories and organization",
    "Inventory and stock management",
    "Customer shopping cart and checkout",
    "Order placement and order management",
    "Store owner order processing",
    "Order status tracking",
    "Payment and transaction management",
    "User and customer management",
    "Role-based access control",
    "Store performance monitoring",
    "Sales and business analytics",
    "Real-time dashboard insights",
    "Responsive web-based dashboards",
    "Centralized management of multiple stores"
  ],

  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Node.js",
    "REST API",
    "Database",
    "Mobile App",
    "Admin Dashboard",
    "Store Owner Dashboard",
    "Vercel"
  ],

  coverImage: "/brinlgy-cover.png",

  thumbnailImage: "/brinlgy-dashboard.png",

  gallery: [
    {
      url: "/brinlgy-mobile-app.png",
      caption: "Brinlgy Customer Mobile App"
    },
    {
      url: "/brinlgy-home.png",
      caption: "Customer Shopping Experience"
    },
    {
      url: "/brinlgy-admin-dashboard.png",
      caption: "Centralized Admin Dashboard"
    },
    {
      url: "/brinlgy-store-dashboard.png",
      caption: "Store Owner Dashboard"
    },
    {
      url: "/brinlgy-product-management.png",
      caption: "Product Management"
    },
    {
      url: "/brinlgy-order-management.png",
      caption: "Order Management"
    },
    {
      url: "/brinlgy-stores.png",
      caption: "Store Management"
    },
    {
      url: "/brinlgy-transactions.png",
      caption: "Transactions and Payments"
    }
  ],

  timeline: "6 months",

  role: "Full-Stack Developer & UI/UX Designer",

  liveUrl: "YOUR_BRINLGY_LIVE_URL",

  githubUrl: "YOUR_GITHUB_URL",

  relatedProjects: [
    {
      slug: "bmc-medical-store",
      title: "BMC Medical Store",
      category: "E-Commerce Web Application",
      image: "/bmc-medical-store.png",
    },
    {
      slug: "ecommerce-redesign",
      title: "E-Commerce Redesign",
      category: "E-Commerce",
      image: "/modern-apparel-storefront.png",
    },

    
  ],
  
}
,
{
  id: 3,
  slug: "fruits-and-nuts-bazar",
  title: "Fruits & Nuts Bazar",
  category: "Full-Stack E-Commerce",

  shortDescription:
    "A full-stack eCommerce web application for buying fresh fruits, nuts, and grocery products online, featuring Firebase integration, product management, cart, checkout, orders, and a complete customer shopping experience.",

  description: [
    "Fruits & Nuts Bazar is a full-stack eCommerce web application developed to provide customers with a simple and convenient way to shop for fresh fruits, nuts, and other grocery products online. The platform provides a modern and responsive shopping experience across desktop and mobile devices.",

    "The application includes all essential eCommerce functionality, allowing customers to browse products, view detailed product information, select quantities, add items to their cart, and proceed through the checkout process. Users can manage their shopping cart and place orders through a smooth and user-friendly interface.",

    "Firebase was integrated into the application to provide backend functionality and data management. The system uses Firebase services for handling application data, user-related functionality, and real-time communication between the customer-facing application and backend services.",

    "The project was developed as a complete eCommerce solution with a focus on performance, usability, responsive design, and a smooth customer journey from product discovery to checkout and order placement."
  ],

  features: [
    "Full-stack eCommerce functionality",
    "Product browsing and product details",
    "Product categories and organization",
    "Product search and filtering",
    "Add to cart functionality",
    "Cart quantity management",
    "Remove products from cart",
    "Checkout process",
    "Order placement and management",
    "Customer account functionality",
    "Firebase backend integration",
    "Real-time data management",
    "Product and inventory management",
    "Responsive design for desktop and mobile",
    "Modern and user-friendly shopping interface",
    "Order and customer data management"
  ],

  technologies: [
    "React.js",
    "JavaScript",
    "Firebase",
    "Firebase Authentication",
    "Firebase Database",
    "HTML5",
    "CSS3",
    "Responsive Design"
  ],

  coverImage: "/fruits-nuts-bazar-cover.png",

  thumbnailImage: "/fruits-nuts-bazar-cover.png",

  gallery: [
    {
      url: "/fruits-nuts-bazar-cover.png",
      caption: "Fruits & Nuts Bazar Homepage"
    },
    {
      url: "/fruits-nuts-products.png",
      caption: "Products and Categories"
    },
    {
      url: "/fruits-nuts-product-details.png",
      caption: "Product Details"
    },
    {
      url: "/fruits-nuts-cart.png",
      caption: "Shopping Cart"
    },
    {
      url: "/fruits-nuts-checkout.png",
      caption: "Checkout Process"
    },
    {
      url: "/fruits-nuts-orders.png",
      caption: "Order Management"
    }
  ],

  timeline: "3 months",

  role: "Full-Stack Developer & UI/UX Designer",

  liveUrl: "https://finalapp-8cad7.web.app/",

  githubUrl: "https://github.com/ajmalhunzai/final_app",

  relatedProjects: [
    {
      slug: "bmc-medical-store",
      title: "BMC Medical Store",
      category: "E-Commerce Web Application",
      image: "/bmc-medical-store-cover.png",
    },
    {
      slug: "brinlgy-ecommerce-platform",
      title: "Brinlgy E-Commerce Platform",
      category: "E-Commerce & Mobile Application",
      image: "/brinlgy-dashboard.png",
    },
  ],
},

{
  id: 4,
  slug: "daw-by-dalilin",
  title: "DAW by Dalilin",
  category: "Multi-Platform E-Commerce & Marketing",

  shortDescription:
    "A complete digital commerce and marketing platform with a customer mobile app, merchant dashboard, admin dashboard, and responsive landing website designed to connect customers, businesses, and delivery operations.",

  description: [
    "DAW by Dalilin is a complete digital commerce and marketing platform designed to connect customers, merchants, and business operations through one intelligent ecosystem. The platform combines a customer-facing mobile application with powerful web-based dashboards and a modern landing website to create a connected marketplace experience.",

    "The customer mobile application allows users to discover businesses, explore products and services, interact with stores, and access marketplace features from their mobile devices. The platform is designed to help customers discover relevant businesses while providing merchants with a digital presence that can reach nearby customers and wider audiences.",

    "A dedicated Merchant Dashboard was developed to give business owners complete control over their stores and marketplace presence. Merchants can manage their business profiles, products, categories, promotions, orders, and other important store operations. The dashboard also provides business insights and store-level information to help merchants understand and improve their performance.",

    "A centralized Admin Dashboard was also developed to manage the complete platform from one place. Administrators can oversee merchants, customers, products, stores, orders, categories, promotions, and other platform operations. The dashboard provides centralized control and monitoring across the entire ecosystem.",

    "In addition to the application and dashboards, a modern responsive landing website was developed to introduce the DAW platform, explain its features, showcase its AI-powered business tools, and direct customers and merchants toward the mobile application and platform. The overall system was designed with a focus on scalability, usability, modern UI/UX, and seamless integration between customers, merchants, and platform operations."
  ],

  features: [
    "Customer mobile application",
    "Merchant / Store Owner dashboard",
    "Centralized admin dashboard",
    "Responsive marketing and landing website",
    "Business and merchant registration",
    "Store profile and business management",
    "Product and service management",
    "Product category management",
    "Order management and tracking",
    "Customer management",
    "Promotions and deals management",
    "Merchant performance insights",
    "AI-powered merchant tools",
    "AI store overview",
    "Smart product management",
    "Smart order tracking",
    "Customer and merchant ecosystem",
    "Multi-platform marketplace experience",
    "Role-based dashboard access",
    "Responsive web interfaces",
    "Mobile-first customer experience"
  ],

  technologies: [
    "React",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "REST APIs",
    "Database Integration",
    "Mobile Application",
    "Admin Dashboard",
    "Merchant Dashboard",
    "AI Integration",
    "Responsive Web Design"
  ],

  coverImage: "/daw-by-dalilin-cover.png",

  thumbnailImage: "/daw-by-dalilin-cover.png",

  gallery: [
    {
      url: "/daw-landing-page.png",
      caption: "DAW by Dalilin Landing Page"
    },
    {
      url: "/daw-mobile-app.png",
      caption: "DAW Customer Mobile Application"
    },
    {
      url: "/daw-admin-dashboard.png",
      caption: "Centralized Admin Dashboard"
    },
    {
      url: "/daw-merchant-dashboard.png",
      caption: "Merchant / Store Owner Dashboard"
    },
    {
      url: "/daw-store-management.png",
      caption: "Store and Business Management"
    },
    {
      url: "/daw-product-management.png",
      caption: "Product Management"
    },
    {
      url: "/daw-order-tracking.png",
      caption: "Smart Order Tracking"
    },
    {
      url: "/daw-analytics.png",
      caption: "Business Analytics and Insights"
    }
  ],

  timeline: "6 months",

  role: "Full-Stack Developer & UI/UX Designer",

  liveUrl: "https://dawbydalilin.com/",

  githubUrl: "YOUR_GITHUB_URL",

  relatedProjects: [
    {
      slug: "brinlgy-ecommerce-platform",
      title: "Brinlgy E-Commerce Platform",
      category: "E-Commerce & Mobile Application",
      image: "/brinlgy-dashboard.png",
    },
    {
      slug: "fruits-and-nuts-bazar",
      title: "Fruits & Nuts Bazar",
      category: "Full-Stack E-Commerce",
      image: "/fruits-nuts-bazar-cover.png",
    },
    {
      slug: "bmc-medical-store",
      title: "BMC Medical Store",
      category: "E-Commerce Web Application",
      image: "/bmc-medical-store-cover.png",
    },
  ],
},

{
  id: 5,
  slug: "ehjz-healthcare-platform",
  title: "EHJZ Healthcare Booking Platform",
  category: "Healthcare & Appointment Booking Platform",

  shortDescription:
    "A complete healthcare booking platform with a patient mobile application, centralized admin dashboard, medical center dashboard, and doctor dashboard for managing appointments, patients, healthcare staff, and medical center operations.",

  description: [
    "EHJZ is a complete healthcare appointment and booking platform designed to connect patients with doctors, clinics, and medical centers through a centralized digital ecosystem. The platform allows patients to discover healthcare providers, view available services and doctors, and conveniently schedule appointments online.",

    "The platform includes a dedicated patient-facing mobile application that provides users with an easy way to manage their healthcare appointments. Patients can search for doctors and medical centers, view provider information, manage their profiles and medical information, and book appointments according to available schedules.",

    "A dedicated Medical Center Dashboard was developed to help healthcare centers manage their day-to-day operations. Medical center staff can manage doctors, departments, services, schedules, appointments, patients, and other center-related information from one centralized dashboard. The system helps medical centers coordinate their staff and provide a more organized appointment management process.",

    "A separate Doctor Dashboard was also developed to give doctors direct access to their appointments and patient-related activities. Doctors can manage their availability, view upcoming appointments, interact with patient information, and manage their professional profile and schedules.",

    "The centralized Admin Dashboard provides complete control over the overall EHJZ platform. Administrators can manage patients, doctors, medical centers, staff, appointments, services, users, and other platform operations. Role-based access ensures that administrators, medical center staff, and doctors can access the features and information relevant to their responsibilities.",

    "The platform was designed to create a seamless connection between patients, doctors, medical centers, and administrative staff. By bringing appointment booking and healthcare management into one system, EHJZ provides a modern and organized digital experience for both healthcare providers and patients."
  ],

  features: [
    "Online healthcare appointment booking",
    "Patient mobile application",
    "Centralized admin dashboard",
    "Medical center dashboard",
    "Doctor dashboard",
    "Patient registration and profile management",
    "Doctor discovery and search",
    "Medical center discovery",
    "Doctor profile management",
    "Medical center profile management",
    "Appointment scheduling and management",
    "Doctor availability and schedule management",
    "Patient appointment history",
    "Patient and doctor interaction",
    "Medical center staff management",
    "Doctor and department management",
    "Healthcare service management",
    "Role-based access control",
    "Admin user and platform management",
    "Appointment status management",
    "Notifications and appointment updates",
    "Responsive web dashboards",
    "Mobile-first patient experience"
  ],

  technologies: [
    "React",
    "Next.js",
    "React Native",
    "TypeScript",
    "Tailwind CSS",
    "ASP.NET Core",
    "C#",
    "REST APIs",
    "MongoDB",
    "JWT Authentication",
    "Payment Integration",
    "Google Maps / Places API",
    "Admin Dashboard",
    "Medical Center Dashboard",
    "Doctor Dashboard"
  ],

  coverImage: "/ehjz-cover.png",

  thumbnailImage: "/ehjz-platform.png",

  gallery: [
    {
      url: "/ehjz-mobile-app.png",
      caption: "EHJZ Patient Mobile Application"
    },
    {
      url: "/ehjz-admin-dashboard.png",
      caption: "Centralized Admin Dashboard"
    },
    {
      url: "/ehjz-medical-center-dashboard.png",
      caption: "Medical Center Dashboard"
    },
    {
      url: "/ehjz-doctor-dashboard.png",
      caption: "Doctor Dashboard"
    },
    {
      url: "/ehjz-appointments.png",
      caption: "Appointment Management"
    },
    {
      url: "/ehjz-patients.png",
      caption: "Patient Management"
    },
    {
      url: "/ehjz-doctors.png",
      caption: "Doctor and Staff Management"
    },
    {
      url: "/ehjz-medical-centers.png",
      caption: "Medical Center Management"
    }
  ],

  timeline: "8 months",

  role: "Full-Stack Developer & UI/UX Designer",

  liveUrl: "https://www.ehjz.qa/",

  githubUrl: "YOUR_GITHUB_URL",

  relatedProjects: [
    {
      slug: "daw-by-dalilin",
      title: "DAW by Dalilin",
      category: "Multi-Platform E-Commerce & Marketing",
      image: "/daw-by-dalilin.png",
    },
    {
      slug: "brinlgy-ecommerce-platform",
      title: "Brinlgy E-Commerce Platform",
      category: "E-Commerce & Mobile Application",
      image: "/brinlgy-dashboard.png",
    },
    {
      slug: "bmc-medical-store",
      title: "BMC Medical Store",
      category: "E-Commerce Web Application",
      image: "/bmc-medical-store.png",
    },
  ],
}
]

export { projects }

// Add these functions after the projects array export

export function getAllProjects(): Project[] {
  return projects
}

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}

export function getRelatedProjects(currentSlug: string, limit = 2): RelatedProject[] {
  const currentProject = getProjectBySlug(currentSlug)
  if (!currentProject || !currentProject.relatedProjects) {
    // If no related projects defined, return random projects
    return projects
      .filter((project) => project.slug !== currentSlug)
      .slice(0, limit)
      .map((project) => ({
        slug: project.slug,
        title: project.title,
        category: project.category,
        image: project.thumbnailImage,
      }))
  }

  return currentProject.relatedProjects.slice(0, limit)
}
