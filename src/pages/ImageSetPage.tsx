import { useState } from "react";
import Header from "@/components/Header";
import ImageSetSidebar from "@/components/ImageSetSidebar";
import OutlineStructure from "@/components/OutlineStructure";

const ImageSetPage = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <ImageSetSidebar 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      
      <OutlineStructure sidebarCollapsed={sidebarCollapsed} />
    </div>
  );
};

export default ImageSetPage;