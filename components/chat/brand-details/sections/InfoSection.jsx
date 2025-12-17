import { SidebarSection } from "@/components/chat/ui/SidebarSection";
import { EditableField } from "@/components/chat/ui/EditableField";

export default function InfoSection({ isOpen, onToggle, formData, onChange }) {
  const preview = [formData.brandName, formData.aka, formData.industry]
    .filter(Boolean)
    .join(" • ");

  return (
    <SidebarSection
      title="Info"
      isOpen={isOpen}
      onToggle={onToggle}
      preview={preview}
      onEdit={() => {}}
    >
      <EditableField
        label="Brand Name"
        value={formData.brandName}
        isEditing={true}
        forceLabel
        onChange={(val) => onChange("brandName", val)}
        placeholder="Your official business name"
      />
      <EditableField
        label="Alias / AKA"
        value={formData.aka}
        isEditing={true}
        forceLabel
        onChange={(val) => onChange("aka", val)}
        placeholder="Sweet Manager"
      />
      <EditableField
        label="Industry"
        value={formData.industry}
        isEditing={true}
        forceLabel
        onChange={(val) => onChange("industry", val)}
        placeholder="e.g., SaaS, Retail"
      />
      <EditableField
        label="Target Audience"
        value={formData.targetAudience}
        isEditing={true}
        forceLabel
        onChange={(val) => onChange("targetAudience", val)}
        placeholder="Who is this for?"
      />
      <EditableField
        label="Website"
        value={formData.website}
        isEditing={true}
        forceLabel
        onChange={(val) => onChange("website", val)}
        placeholder="https://example.com"
      />
    </SidebarSection>
  );
}
