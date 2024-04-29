import { Button } from "@/components/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/tabs";
import { useStore } from "@/libs/valtio";
import { userStore } from "@/stores/user.store";
import { AntDesign, Octicons } from "@expo/vector-icons";
import { Image, SafeAreaView, Text, View } from "react-native";

export default function () {
  const { user } = useStore(userStore);

  if (!user) return;

  return (
    <SafeAreaView>
      <View className="h-full">
        <View className="flex flex-row gap-4 p-4">
          <Image
            source={{ uri: user.avatar }}
            className="h-24 w-24 bg-primary rounded"
          />
          <View className="flex flex-col">
            <Text className="text-3xl font-semibold">{user.name}</Text>
            <Text className="text-sm font-semibold text-muted">
              {user.email}
            </Text>
            <Button
              size="sm"
              rightIcon={<AntDesign name="logout" />}
              onPress={() => userStore.logout()}
              className="mt-2.5"
            >
              Logout
            </Button>
          </View>
        </View>
        <Tabs defaultValue="1">
          <TabsList>
            <TabsTrigger
              value="1"
              title={
                <View className="flex flex-row gap-2">
                  <Octicons name="rows" size={16} />
                  <Text>My List</Text>
                </View>
              }
            />
            <TabsTrigger
              value="2"
              title={
                <View className="flex flex-row gap-2">
                  <Octicons name="history" size={16} />
                  <Text>Recents</Text>
                </View>
              }
            />
            <TabsTrigger
              value="3"
              title={
                <View className="flex flex-row gap-2">
                  <Octicons name="project" size={16} />
                  <Text>Analystic</Text>
                </View>
              }
            />
          </TabsList>

          <TabsContent value="1">
            <Text>My Ebook</Text>
          </TabsContent>
          <TabsContent value="2">
            <Text>Recent Reading</Text>
          </TabsContent>
          <TabsContent value="3">
            <Text>Analytics</Text>
          </TabsContent>
        </Tabs>

        <Dialog>
          <DialogTrigger>
            <Button
              square
              className="absolute bottom-8 right-4"
              leftIcon={<Octicons name="upload" />}
            />
          </DialogTrigger>
          <DialogContent>
            {({ setOpen }) => (
              <View>
                <Text>Content</Text>
              </View>
            )}
          </DialogContent>
        </Dialog>
      </View>
    </SafeAreaView>
  );
}
