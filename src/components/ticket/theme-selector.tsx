import React from "react";

const ThemeButton = ({ gradient, label, onClick, isActive }) => (
  <button
    className={`
      relative 
      rounded-full
      size-10
      transition-all 
      duration-300 
      transform 
      hover:scale-105 
      hover:shadow-lg 
      active:scale-95
      overflow-hidden
      ${isActive ? "ring-2 ring-offset-2 ring-white" : ""}
    `}
    style={{ background: gradient }}
    onClick={onClick}
    aria-label={`Set theme to ${label}`}
  ></button>
);

const ThemeSelector = ({ setTheme }) => {
  const [activeTheme, setActiveTheme] = React.useState(1);

  const themes = [
    {
      id: 1,
      gradient: "linear-gradient(135deg, #206EA6 0%, #0A2472 100%)",
      label: "Ocean Blue",
    },
    {
      id: 2,
      gradient: "linear-gradient(135deg, #BBD3D9 0%, #84A6B3 100%)",
      label: "Arctic Mist",
    },
    {
      id: 3,
      gradient: "linear-gradient(135deg, #4C1077 0%, #2E0F47 100%)",
      label: "Royal Purple",
    },
    {
      id: 4,
      gradient: "linear-gradient(135deg, #FECF29 0%, #F6A417 100%)",
      label: "Golden Sun",
    },
    {
      id: 5,
      gradient: "linear-gradient(135deg, #14F195 0%, #0BA06E 100%)",
      label: "Emerald",
    },
  ];

  const handleThemeChange = (themeId) => {
    setActiveTheme(themeId);
    setTheme(themeId);
  };

  return (
    <div className="max-w-[400px] mx-auto my-4  shadow-lg">
      <div className="flex justify-center gap-3">
        {themes.map((theme) => (
          <ThemeButton
            key={theme.id}
            gradient={theme.gradient}
            label={theme.label}
            onClick={() => handleThemeChange(theme.id)}
            isActive={activeTheme === theme.id}
          />
        ))}
      </div>
    </div>
  );
};

export default ThemeSelector;
