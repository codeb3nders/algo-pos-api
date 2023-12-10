export default async function SidebarItem({ icon }: { icon: any }) {
  'use server';
  return (
    <li>
      {icon}
      <span>{'text'}</span>
    </li>
  );
}
