"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Excalidraw, MainMenu, WelcomeScreen } from "@excalidraw/excalidraw";

const WorkspaceCanvas = ({ data, onChange }: any) => {
  const { theme } = useTheme();

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Excalidraw
        /* @ts-ignore */

        theme={theme === "system" ? "dark" : theme}
        initialData={{
          elements: data,
        }}
        onChange={(excalidrawElements, appState, files) => {
          //  console.log(excalidrawElements, appState, files);
          onChange(excalidrawElements);
        }}
        UIOptions={{
          canvasActions: {
            saveToActiveFile: false,
            loadScene: false,
            export: false,
            toggleTheme: false,
          },
        }}
      >
        <MainMenu>
          <MainMenu.DefaultItems.ClearCanvas />
          <MainMenu.DefaultItems.SaveAsImage />
          <MainMenu.DefaultItems.ChangeCanvasBackground />
        </MainMenu>
        <WelcomeScreen>
          <WelcomeScreen.Center>
            <WelcomeScreen.Center.Heading>
              Welcome Screen Heading!
            </WelcomeScreen.Center.Heading>
          </WelcomeScreen.Center>
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};

export default WorkspaceCanvas;
