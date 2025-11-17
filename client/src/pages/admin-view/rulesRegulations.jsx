import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addRule,
  editRule,
  deleteRule,
  getAllRules,
} from "@/store/admin/rules-slice";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Download, Pencil, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const initialForm = {
  title: "",
  date: "",
  image: null,
};

const RulesRegulations = () => {
  const dispatch = useDispatch();
  const { toast } = useToast();
  const { rulesList } = useSelector((state) => state.rules);

  const [formData, setFormData] = useState(initialForm);
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    dispatch(getAllRules());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.date || (!formData.image && !editingId)) {
      toast({ title: "Please fill all fields", variant: "destructive" });
      return;
    }

    if (editingId) {
      dispatch(editRule({ id: editingId, formData })).then((res) => {
        if (res?.payload?._id) {
          toast({ title: "Rule updated successfully" });
          dispatch(getAllRules());
          resetForm();
        }
      });
    } else {
      dispatch(addRule(formData)).then((res) => {
        if (res?.payload?._id) {
          toast({ title: "Rule added successfully" });
          dispatch(getAllRules());
          resetForm();
        }
      });
    }
  };

  const resetForm = () => {
    setFormData(initialForm);
    setEditingId(null);
  };

  const handleEdit = (rule) => {
    setFormData({
      title: rule.title,
      date: rule.date.split("T")[0],
      image: null,
    });
    setEditingId(rule._id);
  };

  const handleDelete = (id) => {
    dispatch(deleteRule(id)).then((res) => {
      if (res?.payload) {
        toast({ title: "Rule deleted successfully" });
        dispatch(getAllRules());
      }
    });
  };

  const handleDownload = (filePath, fallback = "document") => {
    const fileUrl = `${import.meta.env.VITE_API_URL}${filePath}`;
    const a = document.createElement("a");
    a.href = fileUrl;
    a.download = filePath.split("/").pop() || fallback;
    a.click();
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="mb-6 p-4 border rounded shadow space-y-4 bg-white"
      >
        <h2 className="text-lg font-semibold">
          {editingId ? "Edit Rule" : "Add New Rule"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Title */}
          <div>
            <label className="block font-medium text-sm mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              placeholder="Enter rule title"
              required
            />
          </div>

          {/* Date */}
          <div>
            <label className="block font-medium text-sm mb-1">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full border p-2 rounded"
              required
            />
          </div>

          {/* PDF Upload */}
          <div>
            <label className="block font-medium text-sm mb-1">
              {editingId ? "Upload New PDF (optional)" : "Upload PDF"}
            </label>
            <input
              type="file"
              name="image"
              accept="application/pdf"
              onChange={handleChange}
              className="w-full border p-2 rounded bg-white"
              required={!editingId}
            />
          </div>
        </div>

        <div className="pt-4">
          <Button type="submit">{editingId ? "Update Rule" : "Add Rule"}</Button>
        </div>
      </form>

      {/* Cards List */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {rulesList?.map((rule) => (
          <Card key={rule._id} className="shadow-sm border rounded-xl">
            <CardContent className="p-4">
              <h2 className="text-lg font-semibold break-words max-w-[200px]">
                {rule.title}
              </h2>
              <p className="text-sm text-gray-600 mb-2">
                {rule.date?.split("T")[0]}
              </p>
            </CardContent>
            <CardFooter className="flex justify-between px-4 pb-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleDownload(rule.image, rule.title)}
              >
                <Download className="w-4 h-4 mr-1" />
                Download
              </Button>
              <div className="flex gap-2">
                <Button size="sm" onClick={() => handleEdit(rule)}>
                  <Pencil className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleDelete(rule._id)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};






export default RulesRegulations