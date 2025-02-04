![Project Banner](/public/assets/boss/adentus-banner.webp)
# Fireball TL – Guild Management for Throne & Liberty
**Fireball TL** is an open-source **guild management platform** for **Throne & Liberty**, helping guild leaders and members efficiently organize guild activities.

![Project Banner](/public/metadata/readme-1.png)
![Project Banner](/public/metadata/readme-2.png)
![Project Banner](/public/metadata/readme-3.png)

## 📌 Project Overview
Fireball TL is a static guild management website for Throne & Liberty. It is designed as a client-side-only web application, meaning it does not have a backend or database. All data is stored in static JSON files inside the `public` folder.

## ⚡ Key Points to Know
- 🛑 No Database – All data is managed as static files.
- 📂 Static Data Storage – Stored in JSON files inside the public folder.
- 🌐 Static Website – Built with Next.js 15, but runs entirely on the client-side.
- 🎨 No Theme Color – The UI does not support theme customization.
- 🌍 No Multi-Language Support – The interface is available only in one language.

## 🔥 Features
- 📜 **Guild Member List** – View and manage guild members' information
- 🏹 **Boss Loot Reservation** – Reserve boss loot for fair distribution
- 🎲 **Boss Loot Queue** – Prioritize item drops for guild members
- ⚔️ **Guild Boss Raid Schedule** – Plan and track raid schedules
- 📜 **Guild Rules** – Set internal rules and guidelines for guild members

## 🛠️ Tech Stack
- <img src="https://avatars.githubusercontent.com/u/126103961" title="Next JS" alt="nextjs" width="20" height="20"/> Next.js 14 – Framework for static site generation.
- <img src="https://avatars.githubusercontent.com/u/42876" title="Framer Motion" alt="framermotion" width="20" height="20"/> Framer Motion – Used for animations.
- <img src="https://avatars.githubusercontent.com/u/67109815" title="Tailwind CSS" alt="tailwindcss" width="20" height="20"/> Tailwind CSS – Utility-first CSS framework for styling.
- <img src="https://upload.wikimedia.org/wikipedia/commons/4/4c/Typescript_logo_2020.svg" title="TypeScript" alt="typscript" width="20" height="20"/> TypeScript – Strongly typed JavaScript for better maintainability.

![Project Banner](/public/assets/boss-items/3-0.png)![Project Banner](/public/assets/boss-items/13-0.png)![Project Banner](/public/assets/boss-items/10-0.png)![Project Banner](/public/assets/boss-items/11-0.png)

## 🚀 Live Demo
Try it here: [Fireball TL](https://fireball-tl.vercel.app)

![Project Banner](/public/metadata/readme-4.png)
![Project Banner](/public/metadata/readme-5.png)
![Project Banner](/public/metadata/readme-6.png)

## 📂 Installation & Setup

To run this project locally, follow these steps:

### **1. Clone the repository**
```bash
git clone https://github.com/guysuvijak/fireball-tl.git
```
```bash
cd fireball-tl
```
### **2. Install dependencies**
```bash
npm install
```
### **3. Start the development server**
```bash
npm run dev
```
### **4. The app will be available**
[http://localhost:3000](http://localhost:3000)

![Project Banner](/public/assets/boss/aridus-banner.webp)

## 🗺️ Project Structure
```bash
fireball-tl/
├── public/              # Static assets
│   ├── assets/          # Static Image Data
│   ├── data/            # Static Main Data
│   │   ├── member.json  # Static Guild Member Data -> Edit Here
│   │   ├── queue.json   # Static Queue Boss Data -> Edit Here
│   │   └── update.json  # Static News Data -> Edit Here
│   └── icon/            # Website Icon
└── src/
    ├── app/             # layout & page next.js
    │   ├── boss-queue/  # boss-queue page
    │   ├── boss-rule/   # boss-rule page
    │   ├── memeber/     # member page
    │   ├── position/    # position page
    │   └── schedule/    # schedule page
    ├── components/      # React components
    └── styles/          # CSS styles
```

![Project Banner](/public/assets/boss/nirma-banner.webp)

## 📄 Modifying the Website
Since this is a static website, all modifications must be made directly within the project files. Here’s where you can edit specific parts of the site:
```bash
👥 Guild Members List
📍 File: public/data/member.json
Modify this file to update the list of guild members.
```
```bash
🏹 Boss Loot Queue
📍 File: public/data/queue.json
Update this file to change the queue order for boss loot distribution.
```
```bash
📢 Homepage News & Updates
📍 File: public/data/update.json
Edit this file to change the announcements displayed on the homepage.
```
```bash
🖼️ Adding Images
📍 Folder: public/assets/
Add new images for bosses, boss items, or weapons in this directory.
```
```bash
⚙️ Website Configuration
📍 Files:
src/app/layout.tsx – Modify general layout and metadata settings.
public/manifest.json – Update website metadata for PWA settings.
```

![Project Banner](/public/assets/boss/junobote-banner.webp)

## 📜 License
This project is open-source under the MIT License.
Let me know if you need any modifications! 🚀

![Project Banner](/public/assets/boss/malakar-banner.webp)

## 🙏 Acknowledgments
Thank you for your interest in Fireball TL! Your support means a lot. :heart: </br>
⭐ If you like this project, please consider giving it a star on GitHub to show your support and encouragement! 🚀

![Project Banner](/public/assets/boss/cornelius-banner.webp)
