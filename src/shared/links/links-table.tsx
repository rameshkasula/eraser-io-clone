import React, { useEffect, useRef, useState } from "react";
import Image from "next/image"; // Assuming you're using Next.js for Image optimization

const linksWithImages = [
  {
    title: "Tutorials Point",
    url: "https://www.tutorialspoint.com",
    image: "https://www.tutorialspoint.com/html/images/logo.png",
  },
  {
    title: "W3Schools",
    url: "https://www.w3schools.com/",
    image: "https://www.tutorialspoint.com/html/images/logo.png",
  },
  {
    title: "GCF Global",
    url: "https://edu.gcfglobal.org/en/basic-html/",
    image: "https://www.tutorialspoint.com/html/images/logo.png",
  },
  {
    title: "HyperionDev Blog",
    url: "https://blog.hyperiondev.com/post/html-beginner-tutorial-2-lists-links-images/",
    image: "https://www.tutorialspoint.com/html/images/logo.png",
  },
  {
    title: "TiddlyWiki Google Groups",
    url: "https://groups.google.com/g/tiddlywiki/c/kRZXLw2kyJM",
    image: "https://www.tutorialspoint.com/html/images/logo.png",
  },
];

const InfiniteScrollLinks = () => {
  const [items, setItems] = useState(linksWithImages);
  const containerRef = useRef(null);

  const loadMoreItems = () => {
    // Simulate loading more items
    const newItems = [
      {
        title: "New Item 1",
        url: "#",
        image: "https://via.placeholder.com/32",
      },
      {
        title: "New Item 2",
        url: "#",
        image: "https://via.placeholder.com/32",
      },
      // Add more items as needed
    ];
    setItems((prevItems) => [...prevItems, ...newItems]);
  };

  const handleScroll = () => {
    const { scrollTop, scrollHeight, clientHeight }: any = containerRef.current;
    if (scrollTop + clientHeight >= scrollHeight - 5) {
      loadMoreItems();
    }
  };

  useEffect(() => {
    const container: any = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main
      className="flex flex-1 flex-col gap-2 lg:gap-4 h-[400px] overflow-y-auto scrollbar-hidden"
      ref={containerRef}
    >
      {items.map((link) => (
        <div
          key={link.title}
          className="flex items-center gap-4 border-gray-100 rounded-lg border-red-100"
        >
          <Image
            src={link.image}
            alt={link.title}
            className="h-8 w-8 rounded-full"
            width={32}
            height={32}
          />
          <div className="flex flex-col text-center w-full">
            <p className="text-sm font-medium">{link.title}</p>
          </div>
        </div>
      ))}
    </main>
  );
};

export default InfiniteScrollLinks;
