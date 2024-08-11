import React from 'react';
import {t} from '@superset-ui/core';
import SubMenu, { SubMenuProps } from 'src/features/home/SubMenu';
import withToasts from 'src/components/MessageToasts/withToasts';
import DashboardContent from './components/content/index'
interface DashboardListProps {
  addDangerToast: (msg: string) => void;
  addSuccessToast: (msg: string) => void;
  user: {
    userId: string | number;
    firstName: string;
    lastName: string;
  };
}

function TemplateList(props: DashboardListProps) {

  const subMenuButtons: SubMenuProps['buttons'] = [];

  return (
    <>
      <SubMenu name={t('Dashboards')} buttons={subMenuButtons} />
      <DashboardContent />
    </>
  );
}

export default withToasts(TemplateList);
