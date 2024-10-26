"use client";
import { Role, Section } from "@/interfaces";
import { FC, useState } from "react";
import toast from "react-hot-toast";

interface RolesPageViewProps {
  roles: Role[];
  sections: Section[];
}

interface SelectedSections {
  [key: string]: string[]; // roleId -> array of sectionIds
}
interface UpdateState {
  [key: string]: boolean; // roleId.sectionId -> loading state
}

export const RolesPageView: FC<RolesPageViewProps> = ({ roles, sections }) => {
  //   // Estado para manejar las secciones seleccionadas por usuario
  const [selectedSections, setSelectedSections] = useState<SelectedSections>(
    () => {
      // Inicializar con las secciones que ya tiene cada usuario
      const initial: SelectedSections = {};
      roles.forEach((role) => {
        initial[role.id] = role?.sections?.map((section) => section.id);
      });
      return initial;
    }
  );

  //   // Estado para manejar las actualizaciones en curso
  const [updating, setUpdating] = useState<UpdateState>({});

  const updateSectionInDB = async (
    roleId: string,
    sectionId: string,
    isChecked: boolean
  ) => {
    const updateKey = `${roleId}.${sectionId}`;

    try {
      setUpdating((prev) => ({ ...prev, [updateKey]: true }));

      const response = await fetch("/api/role-sections", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          roleId,
          sectionId,
          action: isChecked ? "add" : "remove",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update section");
      }

      // Actualizar estado local solo después de éxito en la DB
      setSelectedSections((prev) => {
        const newSelections = { ...prev };
        if (!newSelections[roleId]) {
          newSelections[roleId] = [];
        }

        if (isChecked) {
          if (!newSelections[roleId].includes(sectionId)) {
            newSelections[roleId] = [...newSelections[roleId], sectionId];
          }
        } else {
          newSelections[roleId] = newSelections[roleId].filter(
            (id) => id !== sectionId
          );
        }

        return newSelections;
      });

      // Mostrar toast de éxito
      toast.success(`Section ${isChecked ? "added" : "removed"} successfully`, {
        duration: 2000,
        position: "top-right",
        style: {
          background: "#10B981",
          color: "#fff",
        },
      });
    } catch (error) {
      console.error("Error updating section:", error);
      // Mostrar toast de error
      toast.error("Failed to update section. Please try again.", {
        duration: 3000,
        position: "top-right",
        style: {
          background: "#EF4444",
          color: "#fff",
        },
      });

      // Revertir el checkbox en caso de error
      setSelectedSections((prev) => ({ ...prev }));
    } finally {
      setUpdating((prev) => ({ ...prev, [updateKey]: false }));
    }
  };

  //   // Manejar el cambio de checkbox
  const handleCheckboxChange = async (
    roleId: string,
    sectionId: string,
    checked: boolean
  ) => {
    const updateKey = `${roleId}.${sectionId}`;
    if (updating[updateKey]) return; // Evitar múltiples actualizaciones simultáneas

    await updateSectionInDB(roleId, sectionId, checked);
  };

  //   // Verificar si una sección está seleccionada
  const isSectionSelected = (roleId: string, sectionId: string): boolean =>
    selectedSections[roleId]?.includes(sectionId) || false;

  return (
    <tbody>
      {roles?.map((role) => {
        if (!role) return null;
        return (
          <tr key={`${role.id}`} className="flex flex-row border-t">
            <td className="py-3 w-1/2">{role.name}</td>
            <td className="py-3 w-1/2">
              <ul className="space-y-1">
                {sections.map((section) => {
                  const idFor = `${role.id}.${section.id}`;
                  return (
                    <li key={idFor} className="flex gap-2 items-center">
                      <input
                        className="w-4 h-4"
                        type="checkbox"
                        name={section.name}
                        id={idFor}
                        checked={isSectionSelected(role.id, section.id)}
                        onChange={(e) =>
                          handleCheckboxChange(
                            role.id,
                            section.id,
                            e.target.checked
                          )
                        }
                      />
                      <label
                        htmlFor={idFor}
                        className="text-sm cursor-pointer capitalize"
                      >
                        {section.name}
                      </label>
                    </li>
                  );
                })}
              </ul>
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default RolesPageView;
