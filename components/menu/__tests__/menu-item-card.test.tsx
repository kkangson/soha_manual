import { render, screen, fireEvent } from '@testing-library/react'
import { MenuItemCard } from '../menu-item-card'
import { JsonMenuItem } from '@/types/menu'

const mockItem: JsonMenuItem = {
    id: '1',
    name: 'Bulgogi',
    name_ko: '불고기',
    price: 25,
    attributes: ['Spicy', 'Popular'],
    table_settings: ['Spoon', 'Chopsticks'],
    note: 'Delicious marinated beef.',
    image: 'https://example.com/image.jpg'
}

describe('MenuItemCard', () => {
    it('renders the menu item information correctly', () => {
        render(<MenuItemCard item={mockItem} />)

        // Check Korean name
        expect(screen.getByText('불고기')).toBeInTheDocument()
        // Check English name
        expect(screen.getByText('Bulgogi')).toBeInTheDocument()
        // Check price
        expect(screen.getByText('$25')).toBeInTheDocument()
        // Check attributes
        expect(screen.getByText('Spicy')).toBeInTheDocument()
        expect(screen.getByText('Popular')).toBeInTheDocument()
    })

    it('renders table settings correctly', () => {
        render(<MenuItemCard item={mockItem} />)

        expect(screen.getByText('Spoon')).toBeInTheDocument()
        expect(screen.getByText('Chopsticks')).toBeInTheDocument()
    })

    it('toggles the note when the message icon is clicked', () => {
        render(<MenuItemCard item={mockItem} />)

        // Note should not be visible initially (or rather, the opacity/scale is 0)
        // Actually, in MenuItemCard.tsx, the note div is always in DOM but hidden with CSS
        // Let's check the text content
        const noteContent = screen.getByText('Delicious marinated beef.')
        // Since it uses transition-all and opacity-0, we check if it has the classes
        // But testing-library's toBeVisible might check visibility

        expect(noteContent.parentElement).toHaveClass('opacity-0')

        // Click the toggle button
        const toggleButton = screen.getByLabelText('Toggle note')
        fireEvent.click(toggleButton)

        // Now it should have opacity-100
        expect(noteContent.parentElement).toHaveClass('opacity-100')
        expect(noteContent).toHaveTextContent('Delicious marinated beef.')
    })

    it('renders "Photo coming soon" when image is not provided', () => {
        const itemWithoutImage = { ...mockItem, image: undefined }
        render(<MenuItemCard item={itemWithoutImage} />)

        expect(screen.getByText('Photo coming soon')).toBeInTheDocument()
    })
})
