"use client";

import React, { createContext, useState, useEffect } from "react";
import { Schema } from "../types/shema";

const defaultShema: Schema = {
  sidebar: [],
  meta: {},
};

export const AppSchema = createContext(defaultShema);

export default function AppSchemaProvider({
  children,
}: {
  children: React.ReactElement;
}) {
  const [value, setValue] = useState(defaultShema);

  useEffect(() => {
    const getSchema = async () => {
      const response = (await fetch("./config/schema.json")).json();
      setValue(await response);
    };

    getSchema();
  }, []);

  return <AppSchema.Provider value={value}>{children}</AppSchema.Provider>;
}
