import React, { createContext, useContext, useState } from "react"
import { Text, TouchableOpacity, View } from "react-native"

import { cn } from "@/libs/utils"

interface TabsContextProps {
  activeTab: string
  setActiveTab: (id: string) => void
}
const TabsContext = createContext<TabsContextProps>({
  activeTab: "",
  setActiveTab: () => {},
})

interface TabsProps {
  defaultValue: string
  children: React.ReactNode
}
function Tabs({ defaultValue, children }: TabsProps) {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return <TabsContext.Provider value={{ activeTab, setActiveTab }}>{children}</TabsContext.Provider>
}

function TabsList({ className, ...props }: React.ComponentPropsWithoutRef<typeof View>) {
  return <View className={cn("flex flex-row", className)} {...props} />
}

interface TabsTriggerProps extends React.ComponentPropsWithoutRef<typeof TouchableOpacity> {
  value: string
  title: React.ReactNode
  textClasses?: string
}
function TabsTrigger({ value, title, className, textClasses, ...props }: TabsTriggerProps) {
  const { activeTab, setActiveTab } = useContext(TabsContext)

  return (
    <TouchableOpacity
      className={cn(
        "border-b-2 border-transparent px-4 py-2 text-xl transition-colors",
        activeTab === value && "border-primary-700",
        className,
      )}
      onPress={() => setActiveTab(value)}
      {...props}
    >
      <Text className={cn("font-medium", activeTab === value && "text-primary", textClasses)}>{title}</Text>
    </TouchableOpacity>
  )
}

interface TabsContentProps extends React.ComponentPropsWithoutRef<typeof View> {
  value: string
}
function TabsContent({ value, className, ...props }: TabsContentProps) {
  const { activeTab } = useContext(TabsContext)

  if (value === activeTab) return <View className={cn("", className)} {...props} />

  return null
}

export { Tabs, TabsContent, TabsList, TabsTrigger }
