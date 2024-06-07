import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardFooter,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Board, Prompt } from "@/lib/datafetcher";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { SelectPortal } from '@radix-ui/react-select';

interface ItemListProps {
  data: { boards: Board[]; prompts: Prompt[] };
}

const ItemList: React.FC<ItemListProps> = ({ data }) => {
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setHydrated(true);
  }, []);

  const { boards, prompts } = data;

  if (!hydrated) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (
    (!Array.isArray(boards) || boards.length === 0) &&
    (!Array.isArray(prompts) || prompts.length === 0)
  ) {
    return <p className="text-center text-gray-500">No items available.</p>;
  }

  return (
    <div className="space-y-6">
      {boards.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-4">Boards</h2>
          {boards.map((board) => (
            <div
              key={board.id}
              className="bg-red-100 shadow-md rounded-lg p-6 mb-8"
            >
              <h3 className="text-2xl font-bold mb-4">{board.name}</h3>
              {board.bcfs.map((bcf) => (
                <div key={bcf.id} className="mb-6">
                  <h4 className="text-xl font-semibold mb-2">{bcf.name}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
                    {bcf.bcfBoards.map((bcfBoard) => (
                      <Card
                        key={bcfBoard.id}
                        className="bg-gray-100 p-4 rounded-lg shadow-sm flex flex-col"
                      >
                        <CardHeader>
                          <CardTitle>{bcfBoard.name}</CardTitle>
                          <CardDescription>
                            {new Date(bcfBoard.createdAt).toLocaleDateString()}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <p>
                            This is some dummy content for the BCF Board. You
                            can add more details here.
                          </p>
                        </CardContent>
                        <CardFooter className="mt-auto">
                          <Button variant={"default"}>Use Case</Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}

      {prompts.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-4">Prompts</h2>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a prompt" />
            </SelectTrigger>
            <SelectPortal>
              <SelectContent side="bottom">
                {prompts.map((prompt) => (
                  <SelectItem key={prompt.id} value={prompt.id.toString()}>
                    {prompt.name} - {new Date(prompt.createdAt).toLocaleDateString()}
                  </SelectItem>
                ))}
              </SelectContent>
            </SelectPortal>
          </Select>
        </div>
      )}
    </div>
  );
};

export default ItemList;
