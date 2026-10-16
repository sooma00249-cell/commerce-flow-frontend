import { PageContainer } from "@/layouts/PageContainer";
import { PageHeader } from "@/layouts/PageHeader";
import { DesignSection } from "./DesignSection";
import { ColorTokens } from "./sections/ColorTokens";
import { TypographySample } from "./sections/TypographySample";
import { ButtonsSection } from "./sections/ButtonsSection";
import { BadgesSection } from "./sections/BadgesSection";
import { FormSection } from "./sections/FormSection";
import { TableSection } from "./sections/TableSection";
import { DialogSection } from "./sections/DialogSection";
import { useTranslation } from "@/hooks/useTranslation";

/** Gallery of the shared components and design tokens. */
export function DesignSystemPage() {
  const { t } = useTranslation();

  return (
    <PageContainer className="space-y-12">
      <PageHeader title={t("design.title")} description={t("design.subtitle")} />

      <DesignSection id="colors" title={t("design.colors")}>
        <ColorTokens />
      </DesignSection>

      <DesignSection id="typography" title={t("design.typography")}>
        <TypographySample />
      </DesignSection>

      <DesignSection id="buttons" title={t("design.buttons")}>
        <ButtonsSection />
      </DesignSection>

      <DesignSection id="badges" title={t("design.badges")}>
        <BadgesSection />
      </DesignSection>

      <DesignSection id="form" title={t("design.form")}>
        <FormSection />
      </DesignSection>

      <DesignSection id="table" title={t("design.table")}>
        <TableSection />
      </DesignSection>

      <DesignSection id="dialog" title={t("design.dialog")}>
        <DialogSection />
      </DesignSection>
    </PageContainer>
  );
}
