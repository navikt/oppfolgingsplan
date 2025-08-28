import { HStack, Tag } from "@navikt/ds-react";

interface Props {
  isDeltMedLege: boolean;
  isDeltMedNav: boolean;
}

export default function PlanShareTags({ isDeltMedLege, isDeltMedNav }: Props) {
  return (
    <HStack gap="2">
      {isDeltMedLege ? (
        <Tag variant="success-moderate">Delt med fastlege</Tag>
      ) : (
        <Tag variant="neutral-moderate">Ikke delt med fastlege</Tag>
      )}
      {isDeltMedNav ? (
        <Tag variant="success-moderate">Delt med Nav</Tag>
      ) : (
        <Tag variant="neutral-moderate">Ikke delt med Nav</Tag>
      )}
    </HStack>
  );
}
