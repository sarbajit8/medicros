import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllRules } from "@/store/admin/rules-slice";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const RulesRegulations = () => {
  const dispatch = useDispatch();
  const { rulesList } = useSelector((state) => state.rules);

  useEffect(() => {
    dispatch(getAllRules());
  }, [dispatch]);

  const handleDownload = (filePath, fallback = "rule") => {
    const fileUrl = `${import.meta.env.VITE_API_URL}${filePath}`;
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filePath.split("/").pop() || fallback;
    a.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Rules & Regulations</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rulesList?.map((rule) => (
          <Card key={rule._id} className="shadow-sm border rounded-xl">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold break-words max-w-[200px] mb-2">
                {rule.title}
              </h2>
              <p className="text-sm text-gray-600">
                {rule.date?.split("T")[0]}
              </p>
            </CardContent>
            <CardFooter className="flex justify-end px-4 pb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(rule.image, rule.title)}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default RulesRegulations;
